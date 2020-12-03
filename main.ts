enum ActionKind {
    Walking,
    Idle,
    Jumping,
    walkdown,
    walkup,
    walkright,
    idle_down,
    idle_up,
    idle_right,
    idle_left,
    walkleft
}
namespace SpriteKind {
    export const sword = SpriteKind.create()
    export const enemy_unaware = SpriteKind.create()
    export const Drink = SpriteKind.create()
}
function snake_anim () {
	
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if ((mySprite.tileKindAt(TileDirection.Top, myTiles.tile4) || mySprite.tileKindAt(TileDirection.Top, myTiles.tile5)) && vertical == -1 || (mySprite.tileKindAt(TileDirection.Right, myTiles.tile4) || mySprite.tileKindAt(TileDirection.Left, myTiles.tile5)) || (mySprite.tileKindAt(TileDirection.Right, myTiles.tile6) || mySprite.tileKindAt(TileDirection.Left, myTiles.tile7))) {
        game.showLongText("it's a health vending machine!", DialogLayout.Bottom)
        if (info.score() > 4) {
            if (info.life() < 10) {
                info.changeScoreBy(-5)
                music.magicWand.play()
                info.changeLifeBy(1)
            } else {
                game.showLongText("but your health is already full.", DialogLayout.Bottom)
            }
        } else {
            game.showLongText("you don't have enough money.", DialogLayout.Bottom)
        }
    } else if (mySprite.tileKindAt(TileDirection.Top, sprites.dungeon.greenSwitchUp) && vertical == -1) {
        music.pewPew.play()
        tiles.setTileAt(tiles.getTileLocation(23, 25), sprites.dungeon.greenSwitchDown)
        tiles.setTileAt(tiles.getTileLocation(34, 3), sprites.dungeon.greenInnerSouthWest)
        tiles.setTileAt(tiles.getTileLocation(34, 4), sprites.dungeon.floorDarkDiamond)
        tiles.setTileAt(tiles.getTileLocation(34, 5), sprites.dungeon.greenInnerNorthWest)
        tiles.setWallAt(tiles.getTileLocation(34, 4), false)
        game.showLongText("a door opened somewhere!", DialogLayout.Bottom)
    } else if (mySprite.tileKindAt(TileDirection.Top, sprites.dungeon.chestClosed) && vertical == -1 || mySprite.tileKindAt(TileDirection.Right, sprites.dungeon.chestClosed) && horizontal == 1 || mySprite.tileKindAt(TileDirection.Left, sprites.dungeon.chestClosed) && horizontal == -1) {
        reward = randint(0, 4)
        music.jumpUp.play()
        tiles.setTileAt(tiles.getTileLocation(23, 1), sprites.dungeon.chestOpen)
        game.showLongText("you obtained...", DialogLayout.Bottom)
        mySprite.setImage(treasure[reward])
        game.showLongText(text_list[reward], DialogLayout.Bottom)
        game.over(true)
    } else {
        if (swingsword == 0) {
            music.pewPew.play()
            swingsword = 1
            speed = 0
            pause(200)
            swingsword = 0
            speed = 70
            sword2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
        }
    }
})
sprites.onOverlap(SpriteKind.sword, SpriteKind.Enemy, function (sprite, otherSprite) {
    coin = sprites.create(img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `, SpriteKind.Food)
    animation.runImageAnimation(
    coin,
    [img`
        . . b b b b . . 
        . b 5 5 5 5 b . 
        b 5 d 3 3 d 5 b 
        b 5 3 5 5 1 5 b 
        c 5 3 5 5 1 d c 
        c d d 1 1 d d c 
        . f d d d d f . 
        . . f f f f . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 3 5 1 5 b 
        . c 5 3 5 1 d c 
        . c 5 d 1 d d c 
        . . f d d d f . 
        . . . f f f . . 
        `,img`
        . . . b b . . . 
        . . b 5 5 b . . 
        . . b 1 1 b . . 
        . . b 5 5 b . . 
        . . b d d b . . 
        . . c d d c . . 
        . . c 3 3 c . . 
        . . . f f . . . 
        `,img`
        . . . b b b . . 
        . . b 5 5 5 b . 
        . b 5 d 3 d 5 b 
        . b 5 1 5 3 5 b 
        . c d 1 5 3 5 c 
        . c d d 1 d 5 c 
        . . f d d d f . 
        . . . f f f . . 
        `],
    200,
    true
    )
    coin.setPosition(otherSprite.x, otherSprite.y)
    otherSprite.destroy()
    scene.cameraShake(4, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.baDing.play()
    info.changeScoreBy(1)
    otherSprite.destroy()
})
function player_anim () {
    anim_idle_down = animation.createAnimation(ActionKind.idle_down, 100)
    animation.attachAnimation(mySprite, anim_idle_down)
    anim_idle_down.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_idle_up = animation.createAnimation(ActionKind.idle_up, 100)
    animation.attachAnimation(mySprite, anim_idle_up)
    anim_idle_up.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_idle_right = animation.createAnimation(ActionKind.idle_right, 100)
    animation.attachAnimation(mySprite, anim_idle_right)
    anim_idle_right.addAnimationFrame(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    anim_idle_left = animation.createAnimation(ActionKind.idle_left, 100)
    animation.attachAnimation(mySprite, anim_idle_left)
    anim_idle_left.addAnimationFrame(img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    anim_walk_down = animation.createAnimation(ActionKind.walkdown, 200)
    animation.attachAnimation(mySprite, anim_walk_down)
    anim_walk_down.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_walk_down.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . f f e 2 f f f f f f 2 e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . . f e 4 d d d d 4 e f e . . 
        . . f e f 2 2 2 2 e d d 4 e . . 
        . . e 4 f 2 2 2 2 e d d e . . . 
        . . . . f 4 4 5 5 f e e . . . . 
        . . . . f f f f f f f . . . . . 
        . . . . f f f . . . . . . . . . 
        `)
    anim_walk_down.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_walk_down.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f e e 2 2 2 2 2 2 e f f . . 
        . f f e 2 f f f f f f 2 e f f . 
        . f f f f f e e e e f f f f f . 
        . . f e f b f 4 4 f b f e f . . 
        . . f e 4 1 f d d f 1 4 e f . . 
        . . e f e 4 d d d d 4 e f . . . 
        . . e 4 d d e 2 2 2 2 f e f . . 
        . . . e d d e 2 2 2 2 f 4 e . . 
        . . . . e e f 5 5 4 4 f . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . f f f . . . . 
        `)
    anim_walk_up = animation.createAnimation(ActionKind.walkup, 200)
    animation.attachAnimation(mySprite, anim_walk_up)
    anim_walk_up.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_walk_up.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 2 2 f f f f . . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f f 2 f e f . . 
        . . f f f 2 f e e 2 2 f f f . . 
        . . f e 2 f f e e 2 f e e f . . 
        . f f e f f e e e f e e e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . . e f f f f f f f f 4 e . . 
        . . . 4 f 2 2 2 2 2 e d d 4 . . 
        . . . e f f f f f f e e 4 . . . 
        . . . . f f f . . . . . . . . . 
        `)
    anim_walk_up.addAnimationFrame(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    anim_walk_up.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . . f f f f 2 2 f f f f . . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e f 2 f f f 2 f 2 e f . . 
        . . f f f 2 2 e e f 2 f f f . . 
        . . f e e f 2 e e f f 2 e f . . 
        . f f e e e f e e e f f e f f . 
        . f f e e e e e e e e e e f f . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f e . . . 
        . . 4 d d e 2 2 2 2 2 f 4 . . . 
        . . . 4 e e f f f f f f e . . . 
        . . . . . . . . . f f f . . . . 
        `)
    anim_walk_right = animation.createAnimation(ActionKind.walkright, 200)
    animation.attachAnimation(mySprite, anim_walk_right)
    anim_walk_right.addAnimationFrame(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    anim_walk_right.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e e e d d d f . . . 
        . . . . . f 4 d d e 4 e f . . . 
        . . . . . f e d d e 2 2 f . . . 
        . . . . f f f e e f 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `)
    anim_walk_right.addAnimationFrame(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    anim_walk_right.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . 4 d d e 4 4 4 e f . . . 
        . . . . e d d e 2 2 2 2 f . . . 
        . . . . f e e f 4 4 5 5 f f . . 
        . . . . f f f f f f f f f f . . 
        . . . . . f f . . . f f f . . . 
        `)
    anim_walk_left = animation.createAnimation(ActionKind.walkleft, 200)
    animation.attachAnimation(mySprite, anim_walk_left)
    anim_walk_left.addAnimationFrame(img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    anim_walk_left.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d e e e e e f . . . 
        . . . f e 4 e d d 4 f . . . . . 
        . . . f 2 2 e d d e f . . . . . 
        . . f f 5 5 f e e f f f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `)
    anim_walk_left.addAnimationFrame(img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    anim_walk_left.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e d d 4 . . . . 
        . . . f 2 2 2 2 e d d e . . . . 
        . . f f 5 5 4 4 f e e f . . . . 
        . . f f f f f f f f f f . . . . 
        . . . f f f . . . f f . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (unhurtable == 0) {
        info.changeLifeBy(-1)
        music.playMelody("C5 B A G F E D C ", 960)
        unhurtable = 1
        scene.cameraShake(4, 100)
        pause(3000)
        unhurtable = 0
    }
})
let anim_walk_left: animation.Animation = null
let anim_walk_right: animation.Animation = null
let anim_walk_up: animation.Animation = null
let anim_walk_down: animation.Animation = null
let anim_idle_left: animation.Animation = null
let anim_idle_right: animation.Animation = null
let anim_idle_up: animation.Animation = null
let anim_idle_down: animation.Animation = null
let coin: Sprite = null
let reward = 0
let horizontal = 0
let vertical = 0
let speed = 0
let swingsword = 0
let unhurtable = 0
let sword2: Sprite = null
let mySprite: Sprite = null
let snake_alert_right: animation.Animation = null
let snake_alert_left: animation.Animation = null
let snake_idle: animation.Animation = null
let snake: Sprite = null
let text_list: string[] = []
let treasure: Image[] = []
treasure = [img`
    ................f...
    ...............f4f..
    ..............f414f.
    .............f45514f
    .............f44544f
    .............f45454f
    .............f45554f
    .....ffff.....f454f.
    ...fff22fff...f454f.
    ..fff2222fff..f454f.
    .fffeeeeeeffff45554f
    .ffe222222eef4444444
    .fe2ffffff2eff4dde4f
    .ffffbfeefbff.4ddd4.
    ffef41f44f1effeddd4.
    fee4dddddd4eef.e44..
    .feeddddddeef.......
    ..fee4444eef........
    .e4f222222f.........
    .4df222222f.........
    .44f445544f.........
    ....ffffff..........
    ....ff..ff..........
    `, img`
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    .....ffff.....fffff.
    ...fff22fff..f45555f
    ..fff2222ffff4555155
    .fffeeeeeefff4555515
    .ffe222222eef5555555
    .fe2ffffff2ef5555555
    .ffffbfeefbff54e4e4e
    ffef41f44f1eff4ddd4f
    fee4dddddd4eeffe44f.
    .feeddddddeef.......
    ..fee4444eef........
    .e4f222222f.........
    .4df222222f.........
    .44f445544f.........
    ....ffffff..........
    ....ff..ff..........
    `, img`
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    ..............fffff.
    .....ffff.....f6d1f.
    ...fff22fff...f61df.
    ..fff2222fff..f6d1f.
    .fffeeeeeefff.f66f4.
    .ffe222222eef4f66f1.
    .fe2ffffff2ef4f66f4.
    .ffffbfeefbff4f66f1.
    ffef41f44f1ef.ffff4.
    fee4dddddd4eef......
    .feeddddddeef.......
    ..fee4444eef........
    .e4f222222f.........
    .4df222222f.........
    .44f445544f.........
    ....ffffff..........
    ....ff..ff..........
    `, img`
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    ....................
    .....ffff......2ff..
    ...fff22fff....fff..
    ..fff2222fff...f6f..
    .fffeeeeeefff..6f64.
    .ffe222222eef..f6f1.
    .fe2ffffff2ef.4fff4.
    .ffffbfeefbff.4fff1.
    ffef41f44f1effefff4.
    fee4dddddd4eef.fff..
    .feeddddddeef.......
    ..fee4444eef........
    .e4f222222f.........
    .4df222222f.........
    .44f445544f.........
    ....ffffff..........
    ....ff..ff..........
    `, img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 8 8 f f f . . . . 
    . . . f f f 8 8 8 8 f f f . . . 
    . . f f f 6 6 6 6 6 6 f f f . . 
    . . f f 6 8 8 8 8 8 8 6 6 f . . 
    . . f 6 8 f f f f f f 8 6 f . . 
    . . f f f b f e e f b f f f . . 
    . f f e f 1 f 4 4 f 1 f e f f . 
    . f e e 4 d d d d d d 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `]
text_list = ["a golden sword!", "a golden orb!", "a toothbrush!", "a tv remote!", "a new hat!"]
info.setScore(0)
info.setLife(10)
tiles.setTilemap(tiles.createTilemap(hex`3c003c00000000000000000000000000080e0e30310e0e0e0e0e0e060e0e0e0e0e0e060e190900000000000000000000000000000000000000000000000000000000000000000000000000000f22012e2f0101160015221c22010d0d0101011b011309000000000000000000000000000000000000000000000000000000000000000000000000000f0101010122010a001701220101010122012200010117000000000000000000000000000000000000000000000000000000000000000000000000000f0101010101010f000c0101011b00001001010101011300000000000000000000000000000000000000000000000000000000000000000000000000140101012201081919190d01220037370001220d01010c212121000000000000000000000000000000000000000000000000000000001f20202020200d01010101010f00000c0d01010037370001010d0101150000210000000000000000000000000000000000000000000000000000001f2128282828280d010101010118121201010101100000110101012201170000210000000000000000000000000000000000000000000000000000001d1e000000000016010101010112120017012201220101012201010115030000210000000000000000000000000000000000000000000000000000001d1e00000000000a01010d010114000013010101010d0d010101221503000814111306090000000000000000000000000000000000000000000000001d1e000000000002040505050505050505050705050505050507050308191422222222130e09000000000000000000000000000000000000000000001d1e0000000000000000000000000000000000000000000000000008142222220d0d22222213090000000000000000000000000000000000000000001d1e000000000000000000000000000000000000000000000000081422222222222222222222130900000000000000000000000000000000000008140d0d130900000000000000000000001f202020202700000000000a22220d2222222222220d22220c0000000000000000000000000000000000000a0101010113000000000000000000001f2c21212121212700000008142222221505242404162222221309000000000000000000000000000000000018010101010d2020202020202020202021212121212c211e00000014222222220c152424160a222222220b000000000000000000000000000000000018010101010d21212121212121212121212121212121212120202022220d222226260d22232322220d222220202020202020202700000000000000000a010101011528282828282828282821212121212121212128282822220d22222626220d232322220d222228282828282828291e00000000000000000205040505030000000000000000002a21212c212121211e00000016222222220c132525140a222222220c000000000000001d1e0000000000000000000000000000000000000000000000002a2121212121212b0000000216222222130e25250e1422222215030a0000000000001d1e000000000000000000000000000000000000000000000000002a282128282b00000000000f22220d2222222222220d22220c370a0000000000001d1e0000000000000000000000000000000000000000000000000000000000000000000000000216222222222222222222221503370a0000080e19140101130e0e0900000000000000000000000000000000000000000000000000000000000000000002162222220d0d222222150337370a00000f01010101010101010c00000000000000000000000000000000000000000000000000000000000000000000020416222222221505033737370a00000f01010101010101010c00000000000000000000000000000000000000000000000000000000000000000000000002072222070337373737370a00000a01011504160101010c00000000000000000000000000000000000000000000000000000000000000000000000000001d1e0c3739373737370a00000f01010b1a0f0101010c000000000000000000080e190e0e060e0e0e0e0e190e0e0e2d090000000000000000000000001d1e0c3737373737370a00000f0101130e140101010c000000000000000008140101010c01010c220c0c220c0101010c35353535080e0e190e060e140101130e060e0e0e0e1400001401010101010101010c00000000080e0e1914010101010c22010c010c0c220c01220117353535350f0d220101010101010101010101010d010121210101010101010101010c000000000a01010101010101011301010c220c0c220c0101010c35353535180101010101220101010101220101011516242415050516012201150503000000081401010101010101012601011301130c010c0101010b353535350f0101010101010101110101010101010c0a21210c22220a1d1e000000000000000f0122010101010101012601012601261301130101010c353535350a2201011101010101010101010101010b0f21210c22220a1d1e000000000000000f0101010101010122012601012601262601260101010c353535350f0101010101010122010101010101010c0f212113380e141d1e000000000000000f0101010101010101012601012601261501150101010c353535350204051635350d0101010101010d01010c0f2121212121231d1e000000000000000f0101010101010101012601011501150c010c0101010c35353535353535353535150705050505071601010c0f2121212121231d1e000000000000000f0101010101010101011501010c220c0c220c0101010c35353535080e0e14353513060e09080e0614010113060e091a0819140101130e19090000000f0101011516010101010c22010c010c0c220c01220117353535350f01220101011122010c0a01010101010101010c1a0a010101010101010c0000000f0101010c1a160101010c01010c220c0c220c0101010c353535350f01010101010101011314010101010101011113191401010d010d01010c0000000f010101171a0205050504070405050505050505050503353535350f0101010d0d010101010101010d01010d0101010101010101220101110c0000000f010101131a143535353535353535353535353535353535353535181101010d0d010101010101010d01010d010101010101010d010d01010c0000000f010101010c3535353535353535353535353535353535353535350f010101010101010115160101010101010101150516010101010101010c0000000f010101010c3535353535353535353535353535353535353535350f01220101010122010c0a01010101010101010c1a02160101010101010c0000000f01010101130e0e0e09353535353535353535353535353535353502050516010115050503020705161212150407031a1a02040404040404030000000f0101010101010101130e0e0e0e0e0e0e0e0e0e09353535353535080e0e140101130e190912121232242432323232323232323232323232323233330216010122010101010101010101010101010101130e0e0e30310e14010d010101010d010c12121232242432323232323232323232323232323233333302160101010101010101010101010101010101010101012e2f010101010101010101010b121212321212323232323232323232323232323232333333330f0101010101010101010122010101010101010122010101010101010122010101010112121232121232323232323232323232323232323233333333020505050505160101010101010101010101010101010101010101010101220101011712121232121232323232323232323232323232323233333333333333333333020505050505050505050516010101010101010101010101010101010c121212321212323232323232323232323232323232333333333333333333333333333333333333333333020505050505050516010d010101010d010c121212321212323232323232323232323232323232333333333333333333333333333333333333333333333333333333333302050505050505050403121212321212323232323232323232323232323232343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434343434363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636`, img`
    ............2222222222222222222222..........................
    ............2..22..2.2...........22.........................
    ............2......2.2.........2..2.........................
    ............2......2.2....22......2222......................
    ......2222222.....2222...2..2.....2...2.....................
    .....2............2..2...2..2.....222.2.....................
    ....2.............2.......22......2.2.2.....................
    ....2..222222........2...........22.2.2.....................
    ....2..2....2.....2..2..........22.22.222...................
    ....2..2....222222222222222222222222....222.................
    ....2..2........................22........22................
    ....2..2............222222.....22..........22...............
    ...22..22..........2......2....2............2...............
    ...2....22222222222........2..22...22..22...22..............
    ...2.......................2222....22..22....22222222222....
    ...2...................................................2....
    ...2....2..............................................2....
    ...222222222222222.........2222....22..22....22222222..2....
    ..................2...........22...22..22...222.....2..2....
    ...................2......2....2............2.2.....2..2....
    ....................222222.....22..........22.2..2222..2222.
    ................................22........22..2..2........2.
    .................................222....222...2..2........2.
    ...................................22..22.....2..2..222...2.
    ....................................2..2......2..2..2.2...2.
    ........22222222222222222...........2..2......2..2..222...2.
    .......22...2..2.22.2...2222222222222..22.22222..2........2.
    ...22222....2..2.22.2...2....2............................2.
    ...2........2..2.22.2...2....2...............22..2222...222.
    ..22...........2.22.2...2....2...............22..2..2..2....
    ..2...............2.2...2....2...............22..2..2..2....
    ..2.....................2....2...............22..2.22..2....
    ..2...............2.2...2....2222............22........2....
    ..2............2.22.2...2..........22222222..22........2....
    ..2.........2..2.22.2...2....2222..22222222..2222.222..2222.
    ..2...22....2..2.22.2...2....2........22........2.2.......2.
    ..2...2.2...2..2.22.2...2....2........22........222.......2.
    ..2...2.22222222222222222....2............................2.
    ..2...2.2....................2............................2.
    ..2....2.....................2........22........222.......2.
    ..2....2.....................2........22........2.22......2.
    ..2....22222.................2222..22222222..2222..222222222
    ..2........222222222222......2222..2222..22..2..............
    ..22..................22222222........2..22..2..............
    ...22.....................22..........2..2..................
    ....2....................................2..................
    ....2222222...........................2..2..................
    ..........222222222222................2..2..................
    .....................222222222........2..2..................
    .............................2222222222..2..................
    ............................................................
    ............................................................
    ............................................................
    ............................................................
    ............................................................
    ............................................................
    ............................................................
    ............................................................
    ............................................................
    ............................................................
    `, [myTiles.tile0,sprites.dungeon.floorDark2,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouth0,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterNorth2,sprites.dungeon.greenOuterSouth2,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterWest1,sprites.dungeon.greenOuterEast1,sprites.dungeon.greenOuterEast0,sprites.dungeon.floorDarkDiamond,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterWest0,sprites.dungeon.floorDark1,sprites.dungeon.floorDark5,sprites.dungeon.floorLight2,sprites.dungeon.greenInnerSouthWest,sprites.dungeon.greenInnerSouthEast,sprites.dungeon.greenInnerNorthWest,sprites.dungeon.greenInnerNorthEast,sprites.dungeon.greenOuterEast2,sprites.dungeon.greenOuterWest2,sprites.dungeon.greenOuterNorth1,myTiles.tile1,sprites.dungeon.floorDark3,sprites.dungeon.chestClosed,sprites.dungeon.darkGroundWest,sprites.dungeon.darkGroundEast,sprites.dungeon.darkGroundNorthWest0,sprites.dungeon.darkGroundNorth,sprites.dungeon.darkGroundCenter,myTiles.tile2,sprites.dungeon.stairEast,sprites.dungeon.stairNorth,sprites.dungeon.stairSouth,sprites.dungeon.stairWest,sprites.dungeon.darkGroundNorthEast0,sprites.dungeon.darkGroundSouth,sprites.dungeon.darkGroundNorthEast1,sprites.dungeon.darkGroundSouthWest0,sprites.dungeon.darkGroundSouthEast0,myTiles.tile3,sprites.dungeon.greenSwitchUp,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7,sprites.castle.tileGrass1,sprites.castle.tileGrass3,sprites.dungeon.floorLight0,sprites.castle.tilePath5,sprites.builtin.forestTiles10,sprites.dungeon.floorMixed,sprites.dungeon.purpleOuterNorth1,myTiles.tile10], TileScale.Sixteen))
for (let value of tiles.getTilesByType(myTiles.tile2)) {
    snake = sprites.create(img`
        . . . . c c c b b b b b . . . . 
        . . c c b 4 4 4 4 4 4 b b b . . 
        . c c 4 4 4 4 4 5 4 4 4 4 b c . 
        . e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
        e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
        e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
        e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
        . e b 4 4 4 4 4 5 4 4 4 4 b e . 
        8 7 e e b 4 4 4 4 4 4 b e e 6 8 
        8 7 2 e e e e e e e e e e 2 7 8 
        e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
        e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
        e b e 8 8 c c 8 8 c c c 8 e b e 
        e e b e c c e e e e e c e b e e 
        . e e b b 4 4 4 4 4 4 4 4 e e . 
        . . . c c c c c e e e e e . . . 
        `, SpriteKind.Food)
    tiles.placeOnTile(snake, value)
    tiles.setTileAt(value, sprites.dungeon.floorDark2)
    snake_idle = animation.createAnimation(ActionKind.Idle, 1000)
    snake_idle.addAnimationFrame(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 6 6 6 6 6 6 7 7 7 c . . . 
        . f 7 f f 6 6 f f 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 6 c 7 7 6 f c . . 
        . . . f c c c c 7 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `)
    snake_idle.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 6 6 6 6 6 6 7 7 7 c . . . . 
        f 7 f f 6 6 f f 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    animation.attachAnimation(snake, snake_idle)
    snake_alert_left = animation.createAnimation(ActionKind.walkleft, 200)
    snake_alert_left.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 c 6 6 6 6 c 7 7 7 c . . . . 
        f 7 6 f 6 6 f 6 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_left.addAnimationFrame(img`
        . . . . . c c c c c c c . . . . 
        . . . . c 6 7 7 7 7 7 6 c . . . 
        . . . c 7 c 6 6 6 6 c 7 6 c . . 
        . . c 6 7 6 f 6 6 f 6 7 7 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 8 1 f f 1 6 7 7 7 f . . 
        . . f 6 f 1 f f 1 f 7 7 7 f . . 
        . . . f f 2 2 2 2 f 7 7 6 f . . 
        . . c c f 2 2 2 2 7 7 6 f c . . 
        . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
        c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
        f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
        f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
        f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . f 6 1 1 1 1 1 6 6 6 6 c . . . 
        . . f f c c c c c c c c . . . . 
        `)
    animation.attachAnimation(snake, snake_alert_left)
    snake_alert_right = animation.createAnimation(ActionKind.Walking, 200)
    snake_alert_right.addAnimationFrame(img`
        . . . . . . . c c c c c c . . . 
        . . . . . . c 6 7 7 7 7 6 c . . 
        . . . . . c 7 7 7 7 7 7 7 7 c . 
        . . . . c 6 7 7 7 7 7 7 7 7 6 c 
        . . . . c 7 7 7 c 6 6 6 6 c 7 c 
        . . . . f 7 7 7 6 f 6 6 f 6 7 f 
        . . . . f 7 7 7 7 7 7 7 7 7 7 f 
        . . . . f 6 7 7 c 6 7 7 7 7 f . 
        . . c c c f 6 7 7 c c c c f . . 
        . c 7 7 7 c c f 7 7 7 2 6 c . . 
        c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
        c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
        . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
        . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
        . . c c 6 6 7 1 1 1 1 1 6 c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_right.addAnimationFrame(img`
        . . . . c c c c c c c . . . . . 
        . . . c 6 7 7 7 7 7 6 c . . . . 
        . . c 6 7 c 6 6 6 6 c 7 c . . . 
        . . c 7 7 6 f 6 6 f 6 7 6 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 7 7 6 1 f f 1 8 7 f . . 
        . . f 7 7 7 f 1 f f 1 f 6 f . . 
        . . f 6 7 7 f 2 2 2 2 f f . . . 
        . . c f 6 7 7 2 2 2 2 f c c . . 
        . c 7 7 c c 7 7 7 7 7 7 7 7 c . 
        c 7 7 7 6 c f 7 7 7 7 1 1 1 7 c 
        c c 6 6 6 c c f 6 7 1 1 1 1 1 f 
        . . c 6 6 6 c 6 6 1 1 1 1 1 1 f 
        . . c 6 6 6 6 6 6 1 1 1 1 1 6 f 
        . . . c 6 6 6 6 1 1 1 1 1 6 f . 
        . . . . c c c c c c c c f f . . 
        `)
    animation.attachAnimation(snake, snake_alert_right)
}
for (let value of tiles.getTilesByType(myTiles.tile3)) {
    snake = sprites.create(img`
        . . . . . . b b b b . . . . . . 
        . . . . . . b 4 4 4 b . . . . . 
        . . . . . . b b 4 4 4 b . . . . 
        . . . . . b 4 b b b 4 4 b . . . 
        . . . . b d 5 5 5 4 b 4 4 b . . 
        . . . . b 3 2 3 5 5 4 e 4 4 b . 
        . . . b d 2 2 2 5 7 5 4 e 4 4 e 
        . . . b 5 3 2 3 5 5 5 5 e e e e 
        . . b d 7 5 5 5 3 2 3 5 5 e e e 
        . . b 5 5 5 5 5 2 2 2 5 5 d e e 
        . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
        . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
        b d 3 2 d 5 5 5 d d d 4 4 . . . 
        b 5 5 5 5 d d 4 4 4 4 . . . . . 
        4 d d d 4 4 4 . . . . . . . . . 
        4 4 4 4 . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnTile(snake, value)
    tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
    snake_idle = animation.createAnimation(ActionKind.Idle, 1000)
    snake_idle.addAnimationFrame(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 6 6 6 6 6 6 7 7 7 c . . . 
        . f 7 f f 6 6 f f 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 6 c 7 7 6 f c . . 
        . . . f c c c c 7 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `)
    snake_idle.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 6 6 6 6 6 6 7 7 7 c . . . . 
        f 7 f f 6 6 f f 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    animation.attachAnimation(snake, snake_idle)
    snake_alert_left = animation.createAnimation(ActionKind.walkleft, 200)
    snake_alert_left.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 c 6 6 6 6 c 7 7 7 c . . . . 
        f 7 6 f 6 6 f 6 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_left.addAnimationFrame(img`
        . . . . . c c c c c c c . . . . 
        . . . . c 6 7 7 7 7 7 6 c . . . 
        . . . c 7 c 6 6 6 6 c 7 6 c . . 
        . . c 6 7 6 f 6 6 f 6 7 7 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 8 1 f f 1 6 7 7 7 f . . 
        . . f 6 f 1 f f 1 f 7 7 7 f . . 
        . . . f f 2 2 2 2 f 7 7 6 f . . 
        . . c c f 2 2 2 2 7 7 6 f c . . 
        . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
        c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
        f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
        f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
        f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . f 6 1 1 1 1 1 6 6 6 6 c . . . 
        . . f f c c c c c c c c . . . . 
        `)
    animation.attachAnimation(snake, snake_alert_left)
    snake_alert_right = animation.createAnimation(ActionKind.Walking, 200)
    snake_alert_right.addAnimationFrame(img`
        . . . . . . . c c c c c c . . . 
        . . . . . . c 6 7 7 7 7 6 c . . 
        . . . . . c 7 7 7 7 7 7 7 7 c . 
        . . . . c 6 7 7 7 7 7 7 7 7 6 c 
        . . . . c 7 7 7 c 6 6 6 6 c 7 c 
        . . . . f 7 7 7 6 f 6 6 f 6 7 f 
        . . . . f 7 7 7 7 7 7 7 7 7 7 f 
        . . . . f 6 7 7 c 6 7 7 7 7 f . 
        . . c c c f 6 7 7 c c c c f . . 
        . c 7 7 7 c c f 7 7 7 2 6 c . . 
        c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
        c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
        . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
        . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
        . . c c 6 6 7 1 1 1 1 1 6 c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_right.addAnimationFrame(img`
        . . . . c c c c c c c . . . . . 
        . . . c 6 7 7 7 7 7 6 c . . . . 
        . . c 6 7 c 6 6 6 6 c 7 c . . . 
        . . c 7 7 6 f 6 6 f 6 7 6 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 7 7 6 1 f f 1 8 7 f . . 
        . . f 7 7 7 f 1 f f 1 f 6 f . . 
        . . f 6 7 7 f 2 2 2 2 f f . . . 
        . . c f 6 7 7 2 2 2 2 f c c . . 
        . c 7 7 c c 7 7 7 7 7 7 7 7 c . 
        c 7 7 7 6 c f 7 7 7 7 1 1 1 7 c 
        c c 6 6 6 c c f 6 7 1 1 1 1 1 f 
        . . c 6 6 6 c 6 6 1 1 1 1 1 1 f 
        . . c 6 6 6 6 6 6 1 1 1 1 1 6 f 
        . . . c 6 6 6 6 1 1 1 1 1 6 f . 
        . . . . c c c c c c c c f f . . 
        `)
    animation.attachAnimation(snake, snake_alert_right)
}
for (let value of tiles.getTilesByType(myTiles.tile9)) {
    snake = sprites.create(img`
        . . . . . . b b b b a a . . . . 
        . . . . b b d d d 3 3 3 a a . . 
        . . . b d d d 3 3 3 3 3 3 a a . 
        . . b d d 3 3 3 3 3 3 3 3 3 a . 
        . b 3 d 3 3 3 3 3 b 3 3 3 3 a b 
        . b 3 3 3 3 3 a a 3 3 3 3 3 a b 
        b 3 3 3 3 3 a a 3 3 3 3 d a 4 b 
        b 3 3 3 3 b a 3 3 3 3 3 d a 4 b 
        b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e 
        a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e 
        a 3 3 3 3 3 3 3 d d a 4 4 4 e . 
        a a 3 3 3 d d d a a 4 4 4 e e . 
        . e a a a a a a 4 4 4 4 e e . . 
        . . e e b b 4 4 4 4 b e e . . . 
        . . . e e e e e e e e . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    tiles.placeOnTile(snake, value)
    tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
    snake_idle = animation.createAnimation(ActionKind.Idle, 1000)
    snake_idle.addAnimationFrame(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 6 6 6 6 6 6 7 7 7 c . . . 
        . f 7 f f 6 6 f f 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 6 c 7 7 6 f c . . 
        . . . f c c c c 7 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `)
    snake_idle.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 6 6 6 6 6 6 7 7 7 c . . . . 
        f 7 f f 6 6 f f 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    animation.attachAnimation(snake, snake_idle)
    snake_alert_left = animation.createAnimation(ActionKind.walkleft, 200)
    snake_alert_left.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 c 6 6 6 6 c 7 7 7 c . . . . 
        f 7 6 f 6 6 f 6 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_left.addAnimationFrame(img`
        . . . . . c c c c c c c . . . . 
        . . . . c 6 7 7 7 7 7 6 c . . . 
        . . . c 7 c 6 6 6 6 c 7 6 c . . 
        . . c 6 7 6 f 6 6 f 6 7 7 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 8 1 f f 1 6 7 7 7 f . . 
        . . f 6 f 1 f f 1 f 7 7 7 f . . 
        . . . f f 2 2 2 2 f 7 7 6 f . . 
        . . c c f 2 2 2 2 7 7 6 f c . . 
        . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
        c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
        f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
        f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
        f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . f 6 1 1 1 1 1 6 6 6 6 c . . . 
        . . f f c c c c c c c c . . . . 
        `)
    animation.attachAnimation(snake, snake_alert_left)
    snake_alert_right = animation.createAnimation(ActionKind.Walking, 200)
    snake_alert_right.addAnimationFrame(img`
        . . . . . . . c c c c c c . . . 
        . . . . . . c 6 7 7 7 7 6 c . . 
        . . . . . c 7 7 7 7 7 7 7 7 c . 
        . . . . c 6 7 7 7 7 7 7 7 7 6 c 
        . . . . c 7 7 7 c 6 6 6 6 c 7 c 
        . . . . f 7 7 7 6 f 6 6 f 6 7 f 
        . . . . f 7 7 7 7 7 7 7 7 7 7 f 
        . . . . f 6 7 7 c 6 7 7 7 7 f . 
        . . c c c f 6 7 7 c c c c f . . 
        . c 7 7 7 c c f 7 7 7 2 6 c . . 
        c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
        c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
        . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
        . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
        . . c c 6 6 7 1 1 1 1 1 6 c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_right.addAnimationFrame(img`
        . . . . c c c c c c c . . . . . 
        . . . c 6 7 7 7 7 7 6 c . . . . 
        . . c 6 7 c 6 6 6 6 c 7 c . . . 
        . . c 7 7 6 f 6 6 f 6 7 6 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 7 7 6 1 f f 1 8 7 f . . 
        . . f 7 7 7 f 1 f f 1 f 6 f . . 
        . . f 6 7 7 f 2 2 2 2 f f . . . 
        . . c f 6 7 7 2 2 2 2 f c c . . 
        . c 7 7 c c 7 7 7 7 7 7 7 7 c . 
        c 7 7 7 6 c f 7 7 7 7 1 1 1 7 c 
        c c 6 6 6 c c f 6 7 1 1 1 1 1 f 
        . . c 6 6 6 c 6 6 1 1 1 1 1 1 f 
        . . c 6 6 6 6 6 6 1 1 1 1 1 6 f 
        . . . c 6 6 6 6 1 1 1 1 1 6 f . 
        . . . . c c c c c c c c f f . . 
        `)
    animation.attachAnimation(snake, snake_alert_right)
}
for (let value of tiles.getTilesByType(myTiles.tile10)) {
    snake = sprites.create(img`
        ..cccc.........
        .c7776c........
        c67776ccccccc..
        c67776c677777c.
        c67776c7777766c
        c67776c6666666c
        c67776cccccc66c
        c67776c77776ccc
        c67776c777776c.
        c67776c777776c.
        c67776c777776c.
        c67776c777776c.
        c67776c777776c.
        c67776c777776c.
        c67776c777776c.
        c67766c777776c.
        c66666cccccccc.
        c66666c677777c.
        c66666c7777766c
        c66666c6666666c
        c66666c6666666c
        c66666c6666666c
        .cccccccccccccc
        .cbbc.....cbbc.
        `, SpriteKind.Projectile)
    tiles.placeOnTile(snake, value)
    tiles.setTileAt(value, sprites.dungeon.darkGroundCenter)
    snake_idle = animation.createAnimation(ActionKind.Idle, 1000)
    snake_idle.addAnimationFrame(img`
        . . . . c c c c c c . . . . . . 
        . . . c 6 7 7 7 7 6 c . . . . . 
        . . c 7 7 7 7 7 7 7 7 c . . . . 
        . c 6 7 7 7 7 7 7 7 7 6 c . . . 
        . c 7 6 6 6 6 6 6 7 7 7 c . . . 
        . f 7 f f 6 6 f f 7 7 7 f . . . 
        . f 7 7 7 7 7 7 7 7 7 7 f . . . 
        . . f 7 7 7 7 6 c 7 7 6 f c . . 
        . . . f c c c c 7 7 6 f 7 7 c . 
        . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
        . c 7 7 2 7 7 c f c 6 7 7 6 c c 
        c 1 1 1 1 7 6 f c c 6 6 6 c . . 
        f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
        f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
        . f 6 1 1 1 1 1 1 6 6 6 f . . . 
        . . c c c c c c c c c f . . . . 
        `)
    snake_idle.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 6 6 6 6 6 6 7 7 7 c . . . . 
        f 7 f f 6 6 f f 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    animation.attachAnimation(snake, snake_idle)
    snake_alert_left = animation.createAnimation(ActionKind.walkleft, 200)
    snake_alert_left.addAnimationFrame(img`
        . . . c c c c c c . . . . . . . 
        . . c 6 7 7 7 7 6 c . . . . . . 
        . c 7 7 7 7 7 7 7 7 c . . . . . 
        c 6 7 7 7 7 7 7 7 7 6 c . . . . 
        c 7 c 6 6 6 6 c 7 7 7 c . . . . 
        f 7 6 f 6 6 f 6 7 7 7 f . . . . 
        f 7 7 7 7 7 7 7 7 7 7 f . . . . 
        . f 7 7 7 7 6 c 7 7 6 f . . . . 
        . . f c c c c 7 7 6 f c c c . . 
        . . c 6 2 7 7 7 f c c 7 7 7 c . 
        . c 6 7 7 2 7 7 c f 6 7 7 7 7 c 
        . c 1 1 1 1 7 6 6 c 6 6 6 c c c 
        . c 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . c 6 1 1 1 1 1 6 6 6 6 6 c . . 
        . . c 6 1 1 1 1 1 7 6 6 c c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_left.addAnimationFrame(img`
        . . . . . c c c c c c c . . . . 
        . . . . c 6 7 7 7 7 7 6 c . . . 
        . . . c 7 c 6 6 6 6 c 7 6 c . . 
        . . c 6 7 6 f 6 6 f 6 7 7 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 8 1 f f 1 6 7 7 7 f . . 
        . . f 6 f 1 f f 1 f 7 7 7 f . . 
        . . . f f 2 2 2 2 f 7 7 6 f . . 
        . . c c f 2 2 2 2 7 7 6 f c . . 
        . c 7 7 7 7 7 7 7 7 c c 7 7 c . 
        c 7 1 1 1 7 7 7 7 f c 6 7 7 7 c 
        f 1 1 1 1 1 7 6 f c c 6 6 6 c c 
        f 1 1 1 1 1 1 6 6 c 6 6 6 c . . 
        f 6 1 1 1 1 1 6 6 6 6 6 6 c . . 
        . f 6 1 1 1 1 1 6 6 6 6 c . . . 
        . . f f c c c c c c c c . . . . 
        `)
    animation.attachAnimation(snake, snake_alert_left)
    snake_alert_right = animation.createAnimation(ActionKind.Walking, 200)
    snake_alert_right.addAnimationFrame(img`
        . . . . . . . c c c c c c . . . 
        . . . . . . c 6 7 7 7 7 6 c . . 
        . . . . . c 7 7 7 7 7 7 7 7 c . 
        . . . . c 6 7 7 7 7 7 7 7 7 6 c 
        . . . . c 7 7 7 c 6 6 6 6 c 7 c 
        . . . . f 7 7 7 6 f 6 6 f 6 7 f 
        . . . . f 7 7 7 7 7 7 7 7 7 7 f 
        . . . . f 6 7 7 c 6 7 7 7 7 f . 
        . . c c c f 6 7 7 c c c c f . . 
        . c 7 7 7 c c f 7 7 7 2 6 c . . 
        c 7 7 7 7 6 f c 7 7 2 7 7 6 c . 
        c c c 6 6 6 c 6 6 7 1 1 1 1 c . 
        . . c 6 6 6 6 6 6 1 1 1 1 1 c . 
        . . c 6 6 6 6 6 1 1 1 1 1 6 c . 
        . . c c 6 6 7 1 1 1 1 1 6 c . . 
        . . . c c c c c c c c c c . . . 
        `)
    snake_alert_right.addAnimationFrame(img`
        . . . . c c c c c c c . . . . . 
        . . . c 6 7 7 7 7 7 6 c . . . . 
        . . c 6 7 c 6 6 6 6 c 7 c . . . 
        . . c 7 7 6 f 6 6 f 6 7 6 c . . 
        . . c 7 7 7 7 7 7 7 7 7 7 c . . 
        . . f 7 7 7 6 1 f f 1 8 7 f . . 
        . . f 7 7 7 f 1 f f 1 f 6 f . . 
        . . f 6 7 7 f 2 2 2 2 f f . . . 
        . . c f 6 7 7 2 2 2 2 f c c . . 
        . c 7 7 c c 7 7 7 7 7 7 7 7 c . 
        c 7 7 7 6 c f 7 7 7 7 1 1 1 7 c 
        c c 6 6 6 c c f 6 7 1 1 1 1 1 f 
        . . c 6 6 6 c 6 6 1 1 1 1 1 1 f 
        . . c 6 6 6 6 6 6 1 1 1 1 1 6 f 
        . . . c 6 6 6 6 1 1 1 1 1 6 f . 
        . . . . c c c c c c c c f f . . 
        `)
    animation.attachAnimation(snake, snake_alert_right)
}
scene.setBackgroundColor(15)
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
sword2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.sword)
unhurtable = 0
swingsword = 0
speed = 70
vertical = -1
tiles.placeOnRandomTile(mySprite, sprites.castle.tileGrass1)
scene.cameraFollowSprite(mySprite)
player_anim()
snake_anim()
game.onUpdate(function () {
    controller.moveSprite(mySprite, speed, speed)
    if (mySprite.vx > 0) {
        vertical = 0
        horizontal = 1
    }
    if (mySprite.vx < 0) {
        vertical = 0
        // IZZUNS FOREVER
        horizontal = -1
    }
    if (mySprite.vy < 0) {
        vertical = -1
        horizontal = 0
    }
    if (mySprite.vy > 0) {
        vertical = 1
        horizontal = 0
    }
    if (swingsword == 0) {
        if (horizontal == 1) {
            if (mySprite.vx != 0) {
                animation.setAction(mySprite, ActionKind.walkright)
            } else {
                animation.setAction(mySprite, ActionKind.idle_right)
            }
        }
        if (horizontal == -1) {
            if (mySprite.vx != 0) {
                animation.setAction(mySprite, ActionKind.walkleft)
            } else {
                animation.setAction(mySprite, ActionKind.idle_left)
            }
        }
        if (vertical == -1) {
            if (mySprite.vy != 0) {
                animation.setAction(mySprite, ActionKind.walkup)
            } else {
                animation.setAction(mySprite, ActionKind.idle_up)
            }
        }
        if (vertical == 1) {
            if (mySprite.vy != 0) {
                animation.setAction(mySprite, ActionKind.walkdown)
            } else {
                animation.setAction(mySprite, ActionKind.idle_down)
            }
        }
    }
})
game.onUpdate(function () {
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (mySprite.y < value2.y + 56 && mySprite.x < value2.x + 56 && (mySprite.y > value2.y - 56 && mySprite.x > value2.x - 56)) {
            value2.follow(mySprite, 30)
        }
        if (value2.vx == 0 && value2.vy == 0) {
            animation.setAction(value2, ActionKind.Idle)
        } else {
            if (value2.vx < 0) {
                animation.setAction(value2, ActionKind.walkleft)
            } else {
                animation.setAction(value2, ActionKind.Walking)
            }
        }
    }
})
game.onUpdate(function () {
    if (swingsword == 1) {
        if (horizontal == -1) {
            sword2.right = mySprite.left
            mySprite.setImage(img`
                . . . . . . f f . . . . . . . . 
                . . . . f f 2 f f f f . . . . . 
                . . . f f 2 f e e e e f f . . . 
                . . f f 2 2 f e e e e e f f . . 
                . . f e e e e f f e e e e f . . 
                . f e 2 2 2 2 e e f f f f f . . 
                . f 2 e f f f f 2 2 2 e f f f . 
                . f f f e e e f f f f f f f f . 
                . f e e 4 4 f b e 4 4 e f e f . 
                . c f e d d f b 4 d 4 e e f . . 
                c c . e e d d d 4 e e e f . . . 
                1 c e d d e e 2 2 2 2 f . . . . 
                c c e d d 4 4 e 4 4 4 f . . . . 
                . c . e e e e f f f f f . . . . 
                . . . . . f f f f f f f f . . . 
                . . . . . . f f . . f f f . . . 
                `)
            sword2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . c c c c c . . . . . . . 
                . . . c 9 c 1 1 1 c c c c . . . 
                . . c 1 1 1 c 1 1 1 1 1 1 c c c 
                . c 9 1 1 1 1 c 1 1 1 1 1 1 1 9 
                . . c d 1 1 c 1 1 1 9 d d c c c 
                . . . c 9 c d 1 1 c c c c . . . 
                . . . . c c c c c . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            sword2.y = mySprite.y
        }
        if (horizontal == 1) {
            sword2.left = mySprite.right
            mySprite.setImage(img`
                . . . . . . . . f f . . . . . . 
                . . . . . f f f f 2 f f . . . . 
                . . . f f e e e e f 2 f f . . . 
                . . f f e e e e e f 2 2 f f . . 
                . . f e e e e f f e e e e f . . 
                . . f f f f f e e 2 2 2 2 e f . 
                . f f f e 2 2 2 f f f f e 2 f . 
                . f f f f f f f f e e e f f f . 
                . f e f e 4 4 e b f 4 4 e e f . 
                . . f e e 4 d 4 b f d d e f c . 
                . . . f e e e 4 d d d e e . c c 
                . . . . f 2 2 2 2 e e d d e c 1 
                . . . . f 4 4 4 e 4 4 d d e c c 
                . . . . f f f f f e e e e . c . 
                . . . f f f f f f f f . . . . . 
                . . . f f f . . f f . . . . . . 
                `)
            sword2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . c c c c c . . . . 
                . . . c c c c 1 1 1 c 9 c . . . 
                c c c 1 1 1 1 1 1 c 1 1 1 c . . 
                9 1 1 1 1 1 1 1 c 1 1 1 1 9 c . 
                c c c d d 9 1 1 1 c 1 1 d c . . 
                . . . c c c c 1 1 d c 9 c . . . 
                . . . . . . . c c c c c . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            sword2.y = mySprite.y
        }
        if (vertical == 1) {
            sword2.top = mySprite.bottom
            mySprite.setImage(img`
                . . . . . . . f f . . . . . . . 
                . . . . . f f 2 2 f f . . . . . 
                . . . f f f 2 2 2 2 f f f . . . 
                . . f f f 2 2 2 2 2 2 f f f . . 
                . . f f f 2 2 2 2 2 2 f f f . . 
                . . f e e e e e e e e e e f f . 
                . . f e 2 2 2 2 2 2 2 2 e f f . 
                . . f f f f e e e e f f f f f . 
                . . f e f b f 4 4 f b f e f f . 
                . . f e 4 1 f d d f 1 4 e f . . 
                . . f f e 4 d d d d 4 e f e . . 
                . . f e f 2 2 2 2 2 f 4 e . . . 
                . . f 4 f 4 4 5 5 4 f 4 e . . . 
                . . . . f f f f f f d d e . . . 
                . . . . . f f f f e d d e . . . 
                . . . . . . . . . . e e . . . . 
                `)
            sword2.setImage(img`
                . . . . . . . c c c c c . . . . 
                . . . . . . c c b b b c c . . . 
                . . . . . . . c c c c c . . . . 
                . . . . . . . . c d c . . . . . 
                . . . . . . . . c 1 c . . . . . 
                . . . . . . . c 1 1 9 c . . . . 
                . . . . . . . c 1 1 d c . . . . 
                . . . . . . . c 1 1 1 c . . . . 
                . . . . . . c 1 1 1 1 9 c . . . 
                . . . . . . c 1 1 c 1 1 c . . . 
                . . . . . . c 1 c 1 c 1 c . . . 
                . . . . . . c c 1 1 1 c c . . . 
                . . . . . . . c 1 1 d c . . . . 
                . . . . . . . c 1 1 9 c . . . . 
                . . . . . . . . c 9 c . . . . . 
                . . . . . . . . . c . . . . . . 
                `)
            sword2.x = mySprite.x
        }
        if (vertical == -1) {
            sword2.bottom = mySprite.top
            mySprite.setImage(img`
                . . . . d 1 f f f f . . . . . . 
                . . . . f f e e e e f f . . . . 
                . . . f e e e f f e e e f . . . 
                . . f f f f f 2 2 f f f f f . . 
                . . f f e 2 e 2 2 e 2 e f f . . 
                . . f e 2 f 2 f f 2 f 2 e f . . 
                . . f f f 2 2 e e 2 2 f f f . . 
                . f f e f 2 f e e f 2 f e f f . 
                . f e e f f e e e e f e e e f . 
                . . f e e e e e e e e e e f . . 
                . . . f e e e e e e e e f . . . 
                . . . . f f f f f f f f 4 e . . 
                . . . . f 2 2 2 2 2 2 f d 4 . . 
                . . . . f 4 4 4 4 4 4 f 4 4 . . 
                . . . . . f f f f f f . . . . . 
                . . . . . f f . . f f . . . . . 
                `)
            sword2.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . c . . . . . . . . 
                . . . . . . c 1 c . . . . . . . 
                . . . . . c 1 1 9 c . . . . . . 
                . . . . c 1 1 1 1 9 c . . . . . 
                . . . . c c 1 1 1 c c . . . . . 
                . . . . c 1 c 1 c 9 c . . . . . 
                . . . . c 1 1 c d d c . . . . . 
                . . . . . c 1 1 9 c . . . . . . 
                . . . . . c 1 1 d c . . . . . . 
                . . . . . c 1 1 1 c . . . . . . 
                . . . . . c 1 1 d c . . . . . . 
                . . . . . . c d c . . . . . . . 
                . . . . . c c 9 c c . . . . . . 
                . . . . c c c c c c c . . . . . 
                `)
            sword2.x = mySprite.x
        }
    }
})
forever(function () {
    if (unhurtable == 1) {
        mySprite.setFlag(SpriteFlag.Invisible, true)
        pause(100)
        mySprite.setFlag(SpriteFlag.Invisible, false)
        pause(100)
    }
})
