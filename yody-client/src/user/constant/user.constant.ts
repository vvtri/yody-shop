export const tabNames = ['info', 'purchase', 'change-password'] as const
export type TabNames = typeof tabNames[number]

export const fetchPurchaseHistoryKey = 'purchase'
export const fetchPurchaseDetailKey = 'purchase-detail'