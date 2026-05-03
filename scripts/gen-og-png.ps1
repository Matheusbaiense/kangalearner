Add-Type -AssemblyName System.Drawing
$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.Clear([System.Drawing.Color]::FromArgb(255, 7, 26, 44))
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 82, 183, 136))
$g.FillEllipse($brush, 80, 120, 120, 120)
$font = New-Object System.Drawing.Font "Segoe UI", 42, ([System.Drawing.FontStyle]::Bold)
$white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$g.DrawString("KangaLearner", $font, $white, 240, 240)
$sub = New-Object System.Drawing.Font "Segoe UI", 18, ([System.Drawing.FontStyle]::Regular)
$g.DrawString("Australia learner test practice", $sub, $white, 240, 310)
$root = Split-Path $PSScriptRoot -Parent
$path = Join-Path $root "assets\img\social\og-image.png"
$dir = Split-Path $path -Parent
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
$bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Host "Wrote $path"
