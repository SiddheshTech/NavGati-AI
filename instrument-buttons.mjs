import fs from 'fs';
import path from 'path';

const dashboardsDir = path.join(process.cwd(), 'src/pages/dashboards');
const files = fs.readdirSync(dashboardsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dashboardsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already processed
  if (content.includes('useToast()')) continue;

  // Add import for useToast
  content = content.replace(
    /import \{ api \} from '\.\.\/\.\.\/lib\/api';/,
    "import { api } from '../../lib/api';\nimport { useToast } from '../../context/ToastContext';"
  );

  // Add handleAction to the component body
  const componentRegex = /export default function \w+\(\) \{/;
  const handleActionCode = `
  const { addToast, updateToast } = useToast();

  const handleAction = async (actionName: string) => {
    const toastId = addToast('loading', \`Executing \${actionName}...\`);
    try {
      const result = await api.executeAction(actionName);
      updateToast(toastId, 'success', result.message || \`\${actionName} executed successfully\`);
    } catch (error: any) {
      updateToast(toastId, 'error', error.message || \`Failed to execute \${actionName}\`);
    }
  };
`;
  content = content.replace(componentRegex, `$&${handleActionCode}`);

  // Add onClick to all buttons
  // Note: Since React onClick needs a function, and we can infer actionName from text inside the button usually,
  // we'll inject onClick={(e) => handleAction(e.currentTarget.textContent?.trim() || 'Action')}
  content = content.replace(/<button /g, "<button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }} ");
  
  // also handle <button> without space
  content = content.replace(/<button>/g, "<button onClick={(e) => { e.stopPropagation(); handleAction(e.currentTarget.textContent?.trim() || 'Action'); }}>");

  // Fix buttons that already had onClick (we might overwrite them unfortunately, let's fix the tab switching ones)
  // Tab buttons usually have onClick={() => setActiveTab(tab.id)}
  // We can restore them specifically since they are known
  content = content.replace(
    /onClick=\{\(e\) => \{ e\.stopPropagation\(\); handleAction\(e\.currentTarget\.textContent\?\.trim\(\) \|\| 'Action'\); \}\} onClick=\{([^}]+)\}/g,
    "onClick={$1}"
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}
