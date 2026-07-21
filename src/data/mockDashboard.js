export const mockDashboardData = {
  overview: {
    currentTime: "Saturday, 12 July 2026 · 14:32 IST",
    totalSales: {
      value: "₹8,47,620",
      trend: "+11.2%",
      isPositive: true
    },
    activeBranches: {
      value: "5 / 5",
      isPositive: true
    },
    lowStockAlerts: {
      value: 14,
      trend: "+3",
      isPositive: false
    },
    pendingVerifications: {
      value: 8,
      trend: "12 min",
      isPositive: false
    }
  },
  charts: {
    branchSales: [
      { name: "Koramangala", value: 90, label: "dashboard.charts.branches.koramangala" },
      { name: "Whitefield", value: 60, label: "dashboard.charts.branches.whitefield" },
      { name: "Indiranagar", value: 75, label: "dashboard.charts.branches.indiranagar" },
      { name: "HSR Layout", value: 45, label: "dashboard.charts.branches.hsr_layout" },
      { name: "Marathahalli", value: 65, label: "dashboard.charts.branches.marathahalli" }
    ]
  },
  alerts: [
    {
      id: 1,
      type: "warning",
      icon: "⚠️",
      translationKey: "dashboard.alerts.low_stock",
      params: { count: 14 }
    },
    {
      id: 2,
      type: "info",
      icon: "ℹ️",
      translationKey: "dashboard.alerts.pending_verifications",
      params: { count: 8 }
    }
  ]
};
