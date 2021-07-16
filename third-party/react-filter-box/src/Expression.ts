 interface Expression {
    conditionType?: "ET";
    category?: string;
    operator?: string;
    value?: string;
    expressions?:Expression[];    
}

export default Expression;