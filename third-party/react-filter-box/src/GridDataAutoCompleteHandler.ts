import BaseAutoCompleteHandler from "./BaseAutoCompleteHandler";
import Expression from "./Expression";
import * as _ from "lodash";

export default class GridDataAutoCompleteHandler extends BaseAutoCompleteHandler {

    parseResult: Expression[];
    categories: string[];
    cache: any = {};

    constructor(protected data: any[], protected options?: Option[]) {
        super();

        this.parseResult = null;

        this.categories = _.map(this.options, f => {
            if (f.columnText) return f.columnText;
            return f.columnField
        });
    }

    needCategories() {
        return this.categories;
    }

    needOperators(parsedCategory: string) {
        // parsedCategory = this.tryToGetFieldCategory(parsedCategory);
        var found = _.find(this.options, f => {
            return f.customOperatorFunc != null && (
                f.columnText == parsedCategory || f.columnField == parsedCategory
            )
        })

        if (found) {
            return found.customOperatorFunc(parsedCategory);
        }

        // Patrick : remove unwantd operators 
        //return ["=="];
        return ["==", "!=", ">", "<", "<=", ">="];
    }

    needValues(parsedCategory: string, parsedOperator: string): any[] {
        // parsedCategory = this.tryToGetFieldCategory(parsedCategory);
        var found = _.find(this.options, f => f.columnField == parsedCategory || f.columnText == parsedCategory);

        if (found != null && found.type == "selection" && this.data != null) {
            if (!this.cache[parsedCategory]) {
                this.cache[parsedCategory] = _.chain(this.data).map(f => f[parsedCategory]).uniq().value();
            }
            return this.cache[parsedCategory];
        }

        if (found != null && found.customValuesFunc) {
            return found.customValuesFunc(parsedCategory, parsedOperator);
        }

        return [];
    }
}

export interface Option {
    columnField: string;
    columnText?: string;
    type: string;
    customOperatorFunc?: (category: string) => string[]
    customValuesFunc?: (category: string, operator: string) => string[]
}