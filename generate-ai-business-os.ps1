# AI Business OS v2 — Next.js 16 + TypeScript + App Router scaffold
param(
    [string]$Root = "."
)

$ErrorActionPreference = "Stop"

$Root = Resolve-Path $Root

$modules = @(
    @{ slug = "dashboard";  title = "Dashboard";  pageName = "DashboardPage" }
    @{ slug = "leads";      title = "Leads";      pageName = "LeadsPage" }
    @{ slug = "customers";  title = "Customers";  pageName = "CustomersPage" }
    @{ slug = "products";   title = "Products";   pageName = "ProductsPage" }
    @{ slug = "orders";     title = "Orders";     pageName = "OrdersPage" }
    @{ slug = "finance";    title = "Finance";    pageName = "FinancePage" }
    @{ slug = "hr";         title = "HR";         pageName = "HRPage" }
    @{ slug = "inventory";  title = "Inventory";  pageName = "InventoryPage" }
    @{ slug = "marketing";  title = "Marketing";  pageName = "MarketingPage" }
    @{ slug = "whatsapp";   title = "WhatsApp";   pageName = "WhatsAppPage" }
    @{ slug = "ai";         title = "AI";         pageName = "AIPage" }
    @{ slug = "ads";        title = "Ads";        pageName = "AdsPage" }
)

function Ensure-Directory {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
        Write-Host "Created directory: $Path"
    }
}

function Ensure-File {
    param(
        [string]$Path,
        [string]$Content
    )

    if (Test-Path -LiteralPath $Path) {
        Write-Host "Skipped (exists): $Path"
        return
    }

    $parent = Split-Path -LiteralPath $Path -Parent
    if ($parent) {
        Ensure-Directory -Path $parent
    }

    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Created file: $Path"
}

function Get-PageContent {
    param(
        [string]$Title,
        [string]$PageName
    )

    @"
export default function $PageName() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">$Title</h1>
        <p className="mt-2 text-slate-500">Manage $Title from one place.</p>
      </div>

      <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-slate-200 text-slate-400">
        $Title module — coming soon
      </div>
    </div>
  );
}
"@
}

function Get-LoadingContent {
    param([string]$Title)

    @"
export default function Loading() {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
        <p className="text-slate-600">
          Loading $Title...
        </p>
      </div>
    </div>
  );
}
"@
}

function Get-ErrorContent {
    @'
"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">
        Something went wrong
      </h2>

      <p className="text-gray-500">
        {error.message}
      </p>

      <Button onClick={() => reset()}>
        Try Again
      </Button>
    </div>
  );
}
'@
}

Write-Host ""
Write-Host "AI Business OS v2 scaffold -> $Root"
Write-Host ""

$appRoot = Join-Path $Root "app"
Ensure-Directory -Path $appRoot

foreach ($module in $modules) {
    $slug = $module.slug
    $title = $module.title
    $pageName = $module.pageName
    $modulePath = Join-Path $appRoot $slug

    Ensure-Directory -Path $modulePath

    Ensure-File -Path (Join-Path $modulePath "page.tsx") -Content (Get-PageContent -Title $title -PageName $pageName)
    Ensure-File -Path (Join-Path $modulePath "loading.tsx") -Content (Get-LoadingContent -Title $title)
    Ensure-File -Path (Join-Path $modulePath "error.tsx") -Content (Get-ErrorContent)
}

foreach ($module in $modules) {
    $componentPath = Join-Path $Root "components" $module.slug
    Ensure-Directory -Path $componentPath
}

Ensure-Directory -Path (Join-Path $appRoot "repositories")
Ensure-Directory -Path (Join-Path $appRoot "validators")

Write-Host ""
Write-Host "Scaffold complete."
Write-Host ""
