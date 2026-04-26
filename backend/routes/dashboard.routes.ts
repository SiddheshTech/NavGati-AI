import { Router, Response } from 'express';
import { authenticateToken, authorizeRoles, AuthRequest } from '../middleware/auth';

const router = Router();

// Apply authentication middleware to all dashboard routes
router.use(authenticateToken);

// 1. Super Admin Dashboard (Only super_admin)
router.get('/super-admin', authorizeRoles('super_admin'), (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Welcome to the Super Admin Control Center',
    data: {
      activeCompanies: 142,
      systemHealth: '99.9%',
      totalShipmentsMonitored: 45200,
      globalAlerts: 12,
      revenueGenerated: '$1.2M',
      platformSettings: {
        aiPredictionEngine: 'Active',
        globalSlaMonitoring: 'Strict'
      }
    }
  });
});

// 2. Company Admin Dashboard (company_admin & super_admin)
router.get('/company-admin', authorizeRoles('company_admin'), (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Company Organization Overview',
    data: {
      teamMembers: 24,
      activeWorkflows: 8,
      monthlyShipments: 1250,
      slaCompliance: '96.5%',
      integrationStatus: {
        erp: 'Connected',
        fleetManagement: 'Connected'
      },
      recentReports: ['Q3 Logistics Cost', 'March SLA Breaches']
    }
  });
});

// 3. Operations Manager Dashboard (operations_manager & super_admin)
router.get('/operations-manager', authorizeRoles('operations_manager'), (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Daily Logistics & Operations',
    data: {
      activeShipments: 342,
      disruptionAlerts: 5,
      pendingRouteApprovals: 3,
      warehouseBottlenecks: 1,
      fleetOptimizationScore: '88%',
      criticalShipments: [
        { id: 'SHP-1029', route: 'Mumbai -> Delhi', risk: 'High', reason: 'Weather (Rainfall)' },
        { id: 'SHP-1044', route: 'Chennai -> Bangalore', risk: 'Medium', reason: 'Traffic Congestion' }
      ]
    }
  });
});

// 4. Analyst Dashboard (analyst & super_admin)
router.get('/analyst', authorizeRoles('analyst'), (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Data Intelligence & Analytics',
    data: {
      riskScoreAverage: 14.2,
      delayPredictionAccuracy: '94.8%',
      costOptimizationOpportunities: 12,
      kpiTracking: {
        onTimeDelivery: '92%',
        fuelEfficiency: '+5.4%'
      },
      predictiveInsights: [
        'Rerouting SHP-1029 will save 18 hours and $450 in fuel.',
        'Port congestion at JNPT expected to rise by 20% next week.'
      ]
    }
  });
});

// 5. Field Executive Dashboard (field_exec & super_admin)
router.get('/field-executive', authorizeRoles('field_exec'), (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Ground-Level Execution',
    data: {
      assignedShipments: 14,
      deliveriesCompletedToday: 8,
      activeIncidents: 1,
      nextStops: [
        { location: 'Warehouse A (Delhi)', eta: '14:30' },
        { location: 'Hub B (Gurgaon)', eta: '16:45' }
      ],
      driverStatus: 'Available'
    }
  });
});

// 6. Viewer Dashboard (Accessible by viewer, and all other roles)
router.get('/viewer', authorizeRoles('viewer', 'company_admin', 'operations_manager', 'analyst', 'field_exec'), (req: AuthRequest, res: Response) => {
  res.json({
    message: 'Client Visibility Dashboard',
    data: {
      totalShipments: 5,
      inTransit: 3,
      delivered: 2,
      overallStatus: 'On Track',
      recentUpdates: [
        'Shipment SHP-900 arrived at checkpoint 2',
        'Shipment SHP-899 delivered successfully'
      ]
    }
  });
});

export default router;
