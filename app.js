new Vue({
    el: "#vue-calculator",
    data: {
        display: "",
        calculation:{
            valueA:"",
            valueB:"",
            operator:""
        },
    },
    methods: {
       
        numberInput: function(number){
        
            //check if operator is empty, if so push into calculation.valueA
            if(this.calculation.operator.length === 0 ){
                this.display += number;
                this.calculation.valueA += number;            
            }else{
                this.display += number;
                this.calculation.valueB += number;  
            }
            //if operator is not an empty string, push append to valueB
            console.log("Value A", this.calculation.valueA)
            console.log("Value B", this.calculation.valueB)
        },
        setOperator:function(operator){
            this.display += operator;
            this.calculation.operator += operator;  
        }
        
    },
    computed: {

    }
})