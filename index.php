<?php
if (isset($_FILES["images"])) {
    $images = $_FILES["images"];
    $count = count($images["name"]);
    for ($i = 0; $i < $count; $i++) {
        $name = $images["name"][$i];
        $tmp_name = $images["tmp_name"][$i];
        $dst_name = "shapes/" . $name;
        if (file_exists($dst_name)) {
            continue;
        }
        move_uploaded_file($tmp_name, $dst_name);
    }
}

$files = scandir("./shapes");
$files = array_filter($files, fn(string $f) => !str_starts_with($f, "."));
$files = array_values($files);
usort($files, function ($a, $b) {
    return filemtime("shapes/$a") <=> filemtime(("shapes/$b"));
});
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BHJ Shapes</title>
    <link rel="stylesheet" href="src/css/app.css">
    <link rel="shortcut icon" href="favicon.png" type="image/png">
</head>

<body data-files="<?= htmlspecialchars(json_encode($files)) ?>" class="overflow-x-hidden">
    <div id="app"></div>

    <script src="src/app.js" type="module"></script>
</body>

</html>