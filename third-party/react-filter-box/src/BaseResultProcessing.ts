import * as _ from "lodash";
import Expression from "./Expression";

export default class BaseResultProcessing {
    process<T>(data: T[], parsedResult: Expression[]): T[] {
        return _.filter([], f => {
            return false; // do not even call filter
        })
        return _.filter(data, f => {
            // TODO Patrick : 
            return false; // no filtering client side you want his for DTF
            // you return false as you don't want to match any results
            // oherwise the result set is growing = you pick up all the results
            // each time you do a operation / check
            return this.predicate(f, parsedResult); // filtering client side (slow)
        })
    }

    predicateSingle(item: any, parsedResult: Expression) {
        return this.filter(item, parsedResult.category, parsedResult.operator, parsedResult.value);
    }

    predicate(item: any, parsedResult: Expression | Expression[]): boolean {

        var expressions: Expression[] = null;
        if (_.isArray(parsedResult)) {
            expressions = parsedResult;
        } else if (_.isArray(parsedResult.expressions)) {
            expressions = parsedResult.expressions;
        } else {
            return this.predicateSingle(item, parsedResult);
        }

        var result: boolean = true;

        expressions.forEach(f => {
            if (_.isUndefined(f.conditionType)) {
                result = this.predicate(item, f);
            } else

                if (f.conditionType.toLowerCase() == "and") {
                    result = result && this.predicate(item, f);
                } else
                    if (f.conditionType.toLowerCase() == "or") {
                        result = result || this.predicate(item, f);
                    }

        })

        return result;
    }

    filter(row: any, field: string, operator: string, value: string) {
        return true;
    }
}