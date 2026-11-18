Add-Type -AssemblyName System.Drawing
$dir = 'c:\Users\Star\Documents\espionagem1\mega-inventors\regions\es\public\assets\'
function Crop($src, $dst, $x, $y, $w, $h) {
  $img = [System.Drawing.Image]::FromFile($dir + $src)
  Write-Output ($src + ' ' + $img.Width + 'x' + $img.Height)
  $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$w,$h)), $rect, 'Pixel')
  $g.Dispose()
  $bmp.Save($dir + $dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $bmp.Dispose(); $img.Dispose()
}
Crop 'showcase-mao-robotica-diploma.jpg' 'photo-mano-robotica.jpg' 267 28 224 625
Crop 'showcase-grua-hidraulica-pinza.jpg' 'photo-grua-hidraulica.jpg' 747 14 206 652
Crop 'showcase-mapa-120-auto-eletrico.jpg' 'photo-auto-electrico.jpg' 762 10 240 656
