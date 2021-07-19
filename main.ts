controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . 5 . . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        . . . . . . . 5 5 . . . . . . . 
        `, mySprite, 0, -50)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy(effects.disintegrate, 200)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 200)
    scene.cameraShake(4, 200)
    info.changeLifeBy(-1)
})
let asteroid: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . 9 1 . . . . . . . 
    . . . . . . . 9 1 . . . . . . . 
    . . . . . . . 9 1 . . . . . . . 
    . . . . . . . 9 9 . . . . . . . 
    . . . . . . . 9 9 . . . . . . . 
    . . . . . . . 9 9 . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . 9 6 6 9 9 9 . . . . . 
    . . . . 9 9 6 9 9 9 9 9 . . . . 
    . . . 9 9 6 6 b 9 6 6 9 9 . . . 
    . . . 9 6 6 b b 9 9 6 6 9 9 . . 
    . 9 9 9 6 b b 9 9 9 b 6 9 9 9 . 
    9 9 6 6 6 b 9 9 9 9 b 6 6 9 9 9 
    9 9 6 b b 9 9 9 9 9 b b 6 1 9 9 
    9 9 1 9 9 9 9 9 9 9 9 b b b 9 9 
    `, SpriteKind.Player)
mySprite.setPosition(78, 111)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
info.setLife(5)
info.setScore(0)
game.onUpdateInterval(1000, function () {
    asteroid = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . d d d a a a a . . . . . . . 
        . . d a a a f f f c a . . . . . 
        . . d a c a c c c a a a a . . . 
        . a a c a a c a d d a c c a a . 
        . a c c d a c a d a a a a c a f 
        a a c d d a a a c c a a b c c f 
        f f c a b a a a a c c a b a c f 
        f a c b a c c a a a c c b a c a 
        a f c b a a a c a a a c a c c . 
        . a c c a a a c c a d c a c . . 
        . . a a c c a a a d d c a a . . 
        . . . . a c a f f f f c a . . . 
        . . . . . a a d c c c a . . . . 
        . . . . . . a d a a a . . . . . 
        `, 0, 50)
    asteroid.x = randint(0, scene.screenWidth())
    asteroid.setKind(SpriteKind.Enemy)
})
