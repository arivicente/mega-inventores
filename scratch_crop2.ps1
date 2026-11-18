Add-Type -AssemblyName System.Drawing
$dir = 'c:\Users\Star\Documents\espionagem1\mega-inventors\regions\'
function Crop($src, $dst, $x, $y, $w, $h) {
  $img = [System.Drawing.Image]::FromFile($dir + $src)
  $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$w,$h)), $rect, 'Pixel')
  $g.Dispose()
  $bmp.Save($dir + $dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose(); $img.Dispose()
}
Crop 'us\public\assets\category-robots-family.jpg' 'es\public\assets\photo-robots-familia.jpg' 380 90 620 592
Crop 'us\public\assets\category-vehicles-kids.jpg' 'es\public\assets\photo-vehiculos-carton.jpg' 230 290 760 392
