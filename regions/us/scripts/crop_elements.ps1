Add-Type -AssemblyName System.Drawing

$assetsDir = "c:\Users\Star\Documents\espionagem1\mega-inventors\regions\us\public\assets"

function Crop-Image($sourceFile, $x, $y, $w, $h, $destFile) {
    $src = [System.Drawing.Image]::FromFile("$assetsDir\$sourceFile")
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $destBmp = New-Object System.Drawing.Bitmap($w, $h)
    $graphics = [System.Drawing.Graphics]::FromImage($destBmp)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($src, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $destBmp.Save("$assetsDir\$destFile", [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $graphics.Dispose()
    $destBmp.Dispose()
    $src.Dispose()
    Write-Host "Created $destFile ($w x $h)"
}

# 1. Space Missions (4 Photos from v2-space-missions.jpg: 594 x 475)
# Card photos start around Y=110, H=125, W=115
Crop-Image "v2-space-missions.jpg" 38 112 118 126 "mission-rocket.jpg"
Crop-Image "v2-space-missions.jpg" 172 112 118 126 "mission-rover.jpg"
Crop-Image "v2-space-missions.jpg" 304 112 118 126 "mission-iss.jpg"
Crop-Image "v2-space-missions.jpg" 436 112 118 126 "mission-telescope.jpg"

# 2. Before / After Photos from v2-before-after.jpg (591 x 522)
Crop-Image "v2-before-after.jpg" 52 135 238 85 "pain-tablet-toys.jpg"
Crop-Image "v2-before-after.jpg" 320 135 230 85 "solution-rocket-family.jpg"

# 3. Moments Strip (4 Photos from v2-moments-strip.jpg: 739 x 335)
Crop-Image "v2-moments-strip.jpg" 35 105 145 205 "moment-grandpa.jpg"
Crop-Image "v2-moments-strip.jpg" 185 105 145 205 "moment-mom.jpg"
Crop-Image "v2-moments-strip.jpg" 390 105 145 205 "moment-boy-robot.jpg"
Crop-Image "v2-moments-strip.jpg" 590 105 145 205 "moment-creations.jpg"

# 4. Customer Review Photos from v2-reviews-projects.jpg (600 x 692)
Crop-Image "v2-reviews-projects.jpg" 52 108 165 120 "review-family-table.jpg"
Crop-Image "v2-reviews-projects.jpg" 228 108 165 120 "review-living-room.jpg"
Crop-Image "v2-reviews-projects.jpg" 404 108 165 120 "review-cardboard-car.jpg"
Crop-Image "v2-reviews-projects.jpg" 52 400 165 120 "review-rover.jpg"
Crop-Image "v2-reviews-projects.jpg" 228 400 165 120 "review-rocket.jpg"

Write-Host "All individual element photos cropped successfully!"
