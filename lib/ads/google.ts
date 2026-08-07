// Adapter for Google Ads API
// Placeholder for server-side integration with Google Ads API (OAuth2 + API calls)

export async function createGoogleCampaign(oauthToken: string, params: any) {
  // TODO: implement Google Ads creation via Google Ads API (gRPC/REST)
  return {
    id: 'google-campaign-1',
    provider: 'google',
    name: params.name,
    status: 'DRAFT'
  };
}

export async function listGoogleAccounts(oauthToken: string) {
  return [];
}
