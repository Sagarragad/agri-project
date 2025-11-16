# PowerShell script to start Next.js development server
# This script bypasses execution policy for this session

# Set execution policy for current process
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Navigate to project directory
Set-Location $PSScriptRoot

# Start the development server
Write-Host "Starting Next.js development server..." -ForegroundColor Green
npm run dev

