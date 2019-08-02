Vue.component("one-player",{
    template: `
        <div>one player</div>
    
    `
})





Vue.component("two-player", {
    template: `
        <div class="app">  
            <div class="card player">
                <div class="name">
                    <p v-if="player1Plying">{{player1}}<span>.</span></p>
                    <p v-else>{{player1}}</p>
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
                <p v-if="player2Plying">{{player2}}<span>.</span></p>
                <p v-else>{{player2}}</p>
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
            player1: "benson",
            player2: "shola",
            playerScore: 0,
            dealerScore: 0,
            player1Plying: false,
            player2Plying: false,
            player1Count: 0,
            player2Count: 0,
            dice1: 0,
            dice2: 0,
            dice1Image: "https://via.placeholder.com/50x50",
            dice2Image: "https://via.placeholder.com/50x50"
        }
    },

    methods: {

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
        this.gameStarted();
    }, 
    
});

var app = new Vue ({
    el: "#app",

    data: {

        
    },
        
});













