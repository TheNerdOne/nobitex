export const gameMixin = {
    data() {
        return {
            counter: 0,
            guessedNum: 0,
            randomNum: 10,
            message: "",
            min: "",
            max: "",
            PrevGuesses: [],
        };
    },
    computed: {
        spliter() {
            if (this.PrevGuesses.length > 0) {
                return this.PrevGuesses.toString();
            } else {
                return 0;
            }
        },
        lowerThanTen() {
            if (this.counter < 10) {
                return true;
            }
        },
    },
    methods: {
        guessChecker() {
            this.counter += 1;
        },
        generateRandomFloatInRange(min, max) {
            this.randomNum = parseInt(Math.random() * (max - min + 1) + min);
        },
        reset() {
            this.counter = 0;
            this.guessedNum = 0;
            this.message = "";
        },
        handleNum() {
            if (this.counter < 10) {
                if (this.guessedNum > this.randomNum) {
                    this.PrevGuesses.push(this.guessedNum);
                    this.message = "higher than";
                } else if (this.guessedNum < this.randomNum) {
                    this.PrevGuesses.push(this.guessedNum);
                    this.message = "lower than";
                } else {
                    this.message = "equal to";
                }
                this.guessChecker();
            }
        },
    },
    mounted() {
        this.min = parseInt(Math.random() * 10);
        this.max = parseInt(Math.random() * 1000);
        this.generateRandomFloatInRange(this.min, this.max);
    },
}