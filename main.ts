/**
 * Giallo 1
 * 
 * Rosso 2
 * 
 * Blu 3
 */
radio.onReceivedString(function (receivedString) {
    if (receivedString == "ON") {
        Avvia_Telecomando = true
    }
    if (receivedString == "OFF") {
        Avvia_Telecomando = false
    }
})
let Avvia_Telecomando = false
radio.setGroup(1)
Avvia_Telecomando = true
let Rotazione_Negativo = -15
let Rotazione_Positivo = 15
let Beccheggio_Positivo = 30
let Beccheggio_negativo = -30
music.setVolume(170)
basic.forever(function () {
    if (Avvia_Telecomando == true && (input.rotation(Rotation.Roll) > Rotazione_Negativo && input.rotation(Rotation.Roll) < Rotazione_Positivo && (input.rotation(Rotation.Pitch) > Beccheggio_negativo && input.rotation(Rotation.Pitch) < Rotazione_Positivo))) {
        basic.showIcon(IconNames.No)
        radio.sendString("S")
    }
    if (Avvia_Telecomando == true && input.rotation(Rotation.Roll) < Rotazione_Negativo) {
        basic.showArrow(ArrowNames.West)
        radio.sendString("R")
        music.playTone(494, music.beat(BeatFraction.Sixteenth))
    }
    if (Avvia_Telecomando == true && input.rotation(Rotation.Roll) > Rotazione_Positivo) {
        basic.showArrow(ArrowNames.East)
        radio.sendString("L")
        music.playTone(587, music.beat(BeatFraction.Sixteenth))
    }
    if (input.rotation(Rotation.Roll) > Rotazione_Negativo && input.rotation(Rotation.Roll) < Rotazione_Positivo) {
        if (Avvia_Telecomando == true && input.rotation(Rotation.Pitch) > Beccheggio_Positivo) {
            basic.showArrow(ArrowNames.South)
            radio.sendString("F")
            music.playTone(196, music.beat(BeatFraction.Sixteenth))
        }
        if (Avvia_Telecomando == true && input.rotation(Rotation.Pitch) < Rotazione_Negativo) {
            basic.showArrow(ArrowNames.North)
            radio.sendString("B")
            music.playTone(247, music.beat(BeatFraction.Whole))
        }
    }
    if (Avvia_Telecomando == false) {
        basic.showLeds(`
            . # # # .
            . . # . .
            . . # . .
            . . # # .
            . . # . .
            `)
        radio.sendString("S")
    }
})
