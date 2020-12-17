import './Footer.css';

const Footer = () => {

    const kaomojis = [
        'ʕ •ᴥ•ʔ',
        '/ᐠ .ᆺ. ᐟ\\ﾉ',
        'ฅ/ᐠ｡ᆽ｡ᐟ \\',
        '(๑✪ᆺ✪๑)',
        '(˵Φ ω Φ˵)',
        '૮ ºﻌºა',
        '૮ ・ﻌ・ა',
        '(❍ᴥ❍ʋ)',
        'Ꮚ･ω･Ꮚ',
        '(＾³＾)',
    ];

    const genKaomoji = () => kaomojis[Math.floor(Math.random() * (kaomojis.length))];

    return (
        <footer>
            {genKaomoji()} ~ notice me
        </footer>
    )
}

export default Footer;