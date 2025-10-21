Start-Sleep -Seconds 1
try {
  $body = @{ email = 'test@example.com' } | ConvertTo-Json
  $resp = Invoke-RestMethod -Uri 'http://localhost:3001/api/subscribe' -Method Post -ContentType 'application/json' -Body $body
  Write-Host 'RESPONSE:'
  $resp | ConvertTo-Json -Depth 5 | Write-Host
} catch {
  Write-Host 'ERROR:'
  Write-Host $_.Exception.Message
}
