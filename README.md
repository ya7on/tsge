# TSGE (TypeScript Game Engine) [WIP]

- [Документация по интерфейсу](https://ya7on.github.io/tsge/)
- [NPM](https://www.npmjs.com/package/tsge)
- [Исходный код](https://github.com/ya7on/tsge)

## Установка и настройка

```sh
npm i --save tsge
```

Создайте HTML элемент `<canvas />`
```html
<html>
    <head></head>
    <body>
        <!-- ... -->
        <canvas id="canvas"></canvas>
        <!-- ... -->
    </body>
</html>
```

Внутри вашего проекта передайте его в конструктор класса [Engine](https://ya7on.github.io/tsge/classes/Engine.html)
```typescript
const canvasElement = <HTMLCanvasElement>document.getElementById("canvas");
const engine = new Engine(canvasElement);
```
