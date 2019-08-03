var eventBus = new Vue ()

Vue.component("chose-game-type", {
    template: `
        <div>
            <button v-show="!chosen" @click="choseOnePlayer">Single Player</button>
            <button v-show="!chosen" @click="choseTwoPlayer ">Two Player</button>
        </div>
        
    `,
    props: {
        chosen: {
            type: Boolean,
            // required: true
        }
    },
    methods: {
        choseOnePlayer(){
            this.$emit('chose-one-player')
        },

        choseTwoPlayer(){
            this.$emit('chose-two-player')
        },
    }
})


Vue.component("single-player-form", {
    template: `
        <div>
            <form v-show="!gameStarted" @submit.prevent="submitForm">
                <label>Name</label>
                <input v-model="name">
            </form>
            <one-player v-show="gameStarted"></one-player>
        </div>
    `, 
    data () {
        return {
            name: '',
            gameStarted: false
        }
    },

    methods: {
        submitForm () {
            let PlayerName =  this.name
            this.gameStarted = true
            eventBus.$emit('SinglePlayerSubmitted', PlayerName)
            this.name = null
        }
    }
})

Vue.component("two-player-form", {
    template: `
        <div>
            <form v-show="!gameStarted" @submit.prevent="submitForm">
                <label>Name</label>
                <input v-model="playerOne">
                <input v-model="playerTwo">
                <input type="submit" value="Start game">
            </form>
            <two-player v-show="gameStarted"></two-player>
        </div>
    `, 
    data () {
        return {
            playerOne: '',
            playerTwo: '',
            gameStarted: false
        }
    },

    methods: {
        submitForm () {
            let players =  {
                playerOne: this.playerOne,
                playerTwo: this.playerTwo
            }
            this.gameStarted = true
            eventBus.$emit('twoPlayerSubmitted', players)
            this.playerOne = null
            this.playerTwo = null
        }
    }
})

Vue.component("one-player",{
    template: `
        <div class="app">  
            <div class="card player">
                <div class="name">
                    <p>{{playerName}}<span v-if="playerPlying">.</span></p>
                </div> 
                <div class="ScoreBox">
                    <p> Score:<span>{{playerScore}}</span></p>
                </div>
                <div class="actioBtn">
                    <button :disabled="!playerPlying" type="submit"> Playing</button>
                </div>
            </div>
            <div class="centered ">
                <div class="diceIcon">
                    <div>
                        <img :src="dice1Image" alt="">
                        <img :src="dice2Image" alt="">
                    </div>
                </div>

                <div class="rollBtn">
                    <button :disabled="gameEnded"  @click="rollDice" type="submit">Roll Dice</button>
                    <button @click="restart" type="submit">restart</button>
                    <p>Winner is: {{winner}}</p>
                    
                </div>
            </div>
            <div class="card computer">
                <div class="name">
                <p>{{computer}}<span v-if="computerPlying">.</span></p>
                </div> 
                <div class="ScoreBox">
                    <p> Score: <span>{{dealerScore}}</span></p>
                </div>
                <div class="actioBtn">
                    <button :class="{inActive: !computerPlying}" :disabled="!computerPlying" type="submit"> Playing</button>
                </div>
            </div>
        </div>
    `,
    data () {
        return {
            playerName: '',
            computer: 'Dealer',
            playerScore: 0,
            dealerScore: 0,
            playerPlying: false,
            computerPlying: false,
            playerCount: 0,
            computerCount: 0,
            totalDice: 0,
            dice1: 0,
            dice2: 0,
            dice1Image: "https://via.placeholder.com/50x50",
            dice2Image: "https://via.placeholder.com/50x50",
            roll: 0
        }
    },
    methods: {
        restart(){
            this.playerScore = 0
            this.dealerScore = 0
            this.playerCount = 0
            this.computerCount = 0
            this.dice1Image = "https://via.placeholder.com/50x50"
            this.dice2Image = "https://via.placeholder.com/50x50"
            this.playerPlying = true
            this.computerPlying = false
        },


        gameStarted (){
            this.playerPlying = false
        },
        rollDice(){
            this.dice1 = Math.floor(Math.random() * 6) +1
            this.dice2 = Math.floor(Math.random() * 6) +1
            this.dice1Image = `./images/dice-${this.dice1}.png`
            this.dice2Image = `./images/dice-${this.dice2}.png`
            // this.totalDice += this.dice1 + this.dice2;
            // this.roll += 1
            if(this.player1Plying){
                this.playerCount +=1;
                this.playerScore += this.dice1 + this.dice2
                this.playerPlying = false
                this.computerPlying = true
            }else{
                this.computerCount +=1;
                this.dealerScore += this.dice1 + this.dice2
                this.playerPlying = true
                this.computerPlying = false
            }
            
        }  
    },

    computed: {
        winner () {
            if(this.playerCount === 3 && this.computerCount === 3){
                if(this.playerScore > this.dealerScore){
                    return `${this.playerName} You win`
                }else{
                    return `${this.computer} You win`
                }
            }
        },
        gameEnded(){
            if(this.playerCount === 3 && this.computerCount === 3){
                return true
            }else {
                return false
            }
        }
    },

    mounted(){
        this.gameStarted()
        // console.log(this.name)
        // if(this.playerPlying = false){
        //     this.rollDice()
        //     this.playerPlying = true
        // }
        eventBus.$on('SinglePlayerSubmitted', PlayerName => {
            this.playerName = PlayerName 
            // console.log(this.name)
        })
    }
})





Vue.component("two-player", {
    template: `
        <div class="app">  
            <div class="card player">
                <div class="name">
                    <p>{{players[0].playerOne}}<span v-if="player1Plying">.</span></p>
                </div> 
                <div class="ScoreBox">
                    <p> Score:<span>{{playerScore}}</span></p>
                </div>
                <div class="actioBtn">
                    <button :disabled="!player1Plying" type="submit"> Playing</button>
                </div>
            </div>
            <div class="centered ">
                <div class="diceIcon">
                    <div>
                        <img :src="dice1Image" alt="">
                        <img :src="dice2Image" alt="">
                    </div>
                </div>

                <div class="rollBtn">
                    <button :disabled="gameEnded"  @click="rollDice" type="submit">Roll Dice</button>
                    <button @click="restart" type="submit">restart</button>
                    <p>Winner is: {{winner}}</p>
                    
                </div>
            </div>
            <div class="card computer">
                <div class="name">
                <p>{{players[0].playerTwo}}<span v-if="player2Plying">.</span></p>
                </div> 
                <div class="ScoreBox">
                    <p> Score: <span>{{dealerScore}}</span></p>
                </div>
                <div class="actioBtn">
                    <button :class="{inActive: !player2Plying}" :disabled="!player2Plying" type="submit"> Playing</button>
                </div>
            </div>
        </div>
    `,
    
    data () {
        return {
            players: [],
            playerScore: 0,
            dealerScore: 0,
            player1Plying: false,
            player2Plying: false,
            player1Count: 0,
            player2Count: 0,
            totalDice: 0,
            dice1: 0,
            dice2: 0,
            dice1Image: "https://via.placeholder.com/50x50",
            dice2Image: "https://via.placeholder.com/50x50",
            roll: 0
        }
    },

    methods: {
        player1Take(){

        },


        player2Take(){

        },

        restart(){
            this.playerScore = 0
            this.dealerScore = 0
            this.player1Count = 0
            this.player2Count = 0
            this.dice1Image = "https://via.placeholder.com/50x50"
            this.dice2Image = "https://via.placeholder.com/50x50"
            this.player1Plying = true
            this.player2Plying = false
        },


        gameStarted (){
            this.player1Plying = true
        },
        rollDice(){
            this.dice1 = Math.floor(Math.random() * 6) +1
            this.dice2 = Math.floor(Math.random() * 6) +1
            this.dice1Image = `./images/dice-${this.dice1}.png`
            this.dice2Image = `./images/dice-${this.dice2}.png`
            // this.totalDice += this.dice1 + this.dice2;
            // this.roll += 1
            if(this.player1Plying){
                this.player1Count +=1;
                this.playerScore += this.dice1 + this.dice2
                this.player1Plying = false
                this.player2Plying = true
            }else{
                this.player2Count +=1;
                this.dealerScore += this.dice1 + this.dice2
                this.player1Plying = true
                this.player2Plying = false
            }
            
        }  
    },
    computed: {
        winner () {
            if(this.player1Count === 3 && this.player2Count === 3){
                if(this.playerScore > this.dealerScore){
                    return `${this.player1} You win`
                }else{
                    return `${this.player2} You win`
                }
            }
        },
        gameEnded(){
            if(this.player1Count === 3 && this.player2Count === 3){
                return true
            }else {
                return false
            }
        }
    },
    mounted(){
        eventBus.$on('twoPlayerSubmitted', players => {
            this.players.push(players)
            console.log(this.players)
        })
        this.gameStarted();
    }, 
    
});

var app = new Vue ({
    el: "#app",

    data: {
        singlePlayer: false,
        twoPlayer: false,
        gameTypeChosen: false     
    },
    methods: {
        handleSinglePlayerChosen () {
            this.singlePlayer = true
            this.gameTypeChosen = true
        },
        handleTwoPlayerChosen () {
            this.twoPlayer = true
            this.gameTypeChosen = true
        }
    }
        
});













