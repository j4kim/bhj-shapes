<?php
$files = scandir("./shapes");
$files = array_filter($files, fn(string $f) => !str_starts_with($f, "."));
$files = array_values($files);
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BHJ Shapes</title>

    <script src="https://unpkg.com/konva@10/konva.min.js"></script>

    <style>
        body {
            background-color: #fbfbfb;
        }

        #container canvas {
            background-color: white !important;
        }
    </style>
</head>

<body data-files="<?= htmlspecialchars(json_encode($files)) ?>">
    <div id="container"></div>

    <script>
        const files = JSON.parse(document.body.dataset.files);

        const stage = new Konva.Stage({
            container: 'container',
            width: 1000,
            height: 1000,
        });


        const layer = new Konva.Layer();
        files.forEach(function(file, i) {
            Konva.Image.fromURL(`shapes/${file}`, function(node) {
                console.log(file, i)
                node.setAttrs({
                    width: 1000,
                    height: 1000,
                    globalCompositeOperation: 'multiply',
                });
                layer.add(node);
            })
        })
        stage.add(layer);
    </script>
</body>

</html>