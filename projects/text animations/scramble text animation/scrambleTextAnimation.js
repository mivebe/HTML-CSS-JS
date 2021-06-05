/** target element can be sent as props like so */
const el = document.querySelector(".random-symbols"); /** this mocks props passing in this case function takes in "  el  " */


const scrambleText = (e, FMA) => {
    //or be taken from the sent event.target instead  in this case function takes in event
    const el = e.target;   /** the element to be fucked up completely */
    const bufferFillSpeed = 20
    const bufferChangeSpeed = 50
    const newCycleSpeed = 2000  /** this determines how long the message stays before it disappears for the next cycle */
    const newCycleTimeout = 200  /** this is actually holdup in the new cycle that determines how long nothing is displayed before a new message starts to roll */
    const initialCycleTimeout = 100 /** this determines how long it takes for the first ever scrambel to start (after the triggering event) */
    const infinite = false  /** boolean value that determines if the iteration through the FMA is infinite */
    const letterMaxScrambles = 15 /** this specifies how many times a single letter MAY be scrambled (it basically controls the scramble clear period) */
    const symbols = "&#*+-%?£@§$=<>^*|\/~~``[()]ΦΣ0123456789⇰←↑→✀✁✂✃✄✆✇✈✉ ↓	↔ ↕ ↖ ↗ ↘ ↙ ↚  ↛  ↜ ↝ ↞↟⇱ ⇲ ⇳ ⇴ ⇵ ⇶ ⇷ ⇸ ⇹ ⇺ ⇻ ⇼ ⇽ ⇾ ⇿ ↸	↹ ↺ ↻ ↼ ↽ ↾ ↿ ← ⇤ ↯ ↷ ↶ ⇈ ↭ ↬ ⇦ ⇧ ⇩ ⇨ ⇋ AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz ΨψΩωΔδ";

    let currentLength = 0; /** this is from how many rng symbols will the message start to animate (creates the spread from center effect) */
    let initialFadeBuffer = false; /** this takes the value of FMA[currentMessage] so that it can chane non-destructively*/
    let currentMessage = 0; /** This is the index of the message from the FMA which will be the first final result (it determines from which message the scramble will start) */
    /**Final Messages Array */
    // let FMA = [ 
    //     "Znaesh li zashto obicham kone, zashtoto serat kadeto si poiskat.",
    //     "Vednuj, kogato bqh sam, nqmashe nikoi.",
    //     "Kato te vidq i se seshtam za tebe.",
    //     "Kat nimoish nidei."
    // ];

    const createRNGString = (length) => {
        let RNGString = '';
        while (RNGString.length < length) {
            RNGString += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
        return RNGString;
    };

    const animate = () => {
        if (currentLength < FMA[currentMessage].length) {
            currentLength = currentLength + 2;

            if (currentLength > FMA[currentMessage].length) {
                currentLength = FMA[currentMessage].length;
            }

            let message = createRNGString(currentLength);

            el.innerText = message

            setTimeout(animate, bufferFillSpeed);
        } else {
            setTimeout(animateFadeBuffer, bufferFillSpeed);
        }
    };


    const animateFadeBuffer = () => {
        if (initialFadeBuffer === false) { /** if bus is empty fill it (its only empty if its a new cycle) */
            initialFadeBuffer = [];
            for (let i = 0; i < FMA[currentMessage].length; i++) {
                /** SMS stands for specific max scrambles  it is a result between 1 and the max possible scrambles */
                /** letter is the current letter from the current message that is to be scrambled */
                initialFadeBuffer.push({ SMS: (Math.floor(Math.random() * letterMaxScrambles)) + 1, letter: FMA[currentMessage].charAt(i) });
            }
        }

        let scrambleLetter = false;  /** flag to determine if there are any scrambles left to be done on that specific character */
        let message = "";

        for (let i = 0; i < initialFadeBuffer.length; i++) {
            const fader = initialFadeBuffer[i];
            if (fader.SMS > 0) {
                scrambleLetter = true;
                fader.SMS--;
                message += symbols.charAt(Math.floor(Math.random() * symbols.length));
            } else {
                message += fader.letter;
            }
        }

        el.innerText = message

        if (scrambleLetter === true) {
            setTimeout(animateFadeBuffer, bufferChangeSpeed);
        } else {
            setTimeout(startNewCycle, newCycleSpeed);
        }
    };

    const startNewCycle = () => {
        currentMessage++;  /** take the next message from the FMA */

        /** if its out of bounds */
        if (currentMessage >= FMA.length) {
            /** if iteration through the messages shoul repeat */
            if (infinite === true) {
                currentMessage = 0;   /** start from the begining again */
            } else {
                return  /** or stop the animation */
            }
        }

        currentLength = 0;
        initialFadeBuffer = false;

        el.innerText = ""

        setTimeout(animate, newCycleTimeout);
    };

    setTimeout(animate, initialCycleTimeout)
}