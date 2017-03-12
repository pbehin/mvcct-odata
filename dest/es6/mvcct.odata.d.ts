export interface IAggregation {
    property: string | null;
    alias: string;
    initialize: (x: IAggregation) => void;
    update: (val: any, x: IAggregation) => void;
    result: (x: IAggregation) => any;
    counters: number[];
    set?: {
        [x: string]: boolean;
    };
}
export declare abstract class QueryNode {
    encodeProperty(name: string): string;
    abstract toString(): string | null;
    getProperty(o: any, p: string): any;
}
export declare abstract class QueryFilterClause extends QueryNode {
    abstract toQuery(): ((o: any) => boolean) | null;
}
export interface IQueryFilterBooleanOperator {
    operator?: number;
    argument1?: IQueryValue;
    argument2?: IQueryValue;
    child1?: IQueryFilterBooleanOperator;
    child2?: IQueryFilterBooleanOperator;
}
export declare class QueryFilterBooleanOperator extends QueryFilterClause implements IQueryFilterBooleanOperator {
    static readonly and: number;
    static readonly or: number;
    static readonly not: number;
    static readonly AND: number;
    static readonly OR: number;
    static readonly NOT: number;
    operator: number;
    argument1: QueryValue;
    argument2: QueryValue;
    child1: QueryFilterBooleanOperator;
    child2: QueryFilterBooleanOperator;
    constructor(origin: IQueryFilterBooleanOperator);
    constructor(operator: number, a1: QueryValue | QueryFilterBooleanOperator, a2?: QueryValue | QueryFilterBooleanOperator);
    toString(): string | null;
    toQuery(): ((o: any) => boolean) | null;
}
export interface IQueryValue {
    value: any;
    dateTimeType: number;
}
export declare class QueryValue extends QueryFilterClause implements IQueryValue {
    static IsNotDateTime: number;
    static IsDate: number;
    static IsTime: number;
    static IsDateTime: number;
    static IsDuration: number;
    value: any;
    dateTimeType: number;
    constructor(origin?: IQueryValue);
    private formatInt(x, len);
    private normalizeTime(x, days, maxTree);
    isGuid(): boolean;
    setDate(x: Date | null): void;
    setTime(x: Date | null): void;
    setDuration(days: number, hours: number, minutes?: number, seconds?: number, milliseconds?: number): void;
    setDateTimeLocal(x: Date | null): void;
    setDateTimeInvariant(x: Date | null): void;
    setBoolean(x: boolean | null): void;
    setNumber(x: number | null): void;
    setString(x: string | null): void;
    getValue(): any;
    toString(): string | null;
    toQuery(): ((o: any) => boolean) | null;
}
export interface IQueryFilterCondition extends IQueryValue {
    operator: string | null;
    property: string | null;
    inv: boolean;
}
export declare class QueryFilterCondition extends QueryValue implements IQueryFilterCondition {
    static readonly eq: string;
    static readonly ne: string;
    static readonly gt: string;
    static readonly lt: string;
    static readonly ge: string;
    static readonly le: string;
    static readonly startswith: string;
    static readonly endswith: string;
    static readonly contains: string;
    private static readonly dict;
    operator: string | null;
    property: string | null;
    inv: boolean;
    constructor(origin?: IQueryFilterCondition);
    toQuery(): ((o: any) => boolean) | null;
    toString(): string | null;
}
export interface IQuerySearch {
    value: IQueryFilterBooleanOperator;
}
export declare class QuerySearch extends QueryNode implements IQuerySearch {
    value: QueryFilterBooleanOperator;
    constructor(origin: IQuerySearch | IQueryFilterBooleanOperator | IQueryFilterCondition);
    toString(): string | null;
    toQuery(): ((o: any) => boolean) | null;
}
export interface IQuerySortingCondition {
    property: string;
    down: boolean;
}
export declare class QuerySortingCondition extends QueryNode implements IQuerySortingCondition {
    property: string;
    down: boolean;
    constructor(x: IQuerySortingCondition);
    constructor(property: string, down?: boolean);
    toString(): string | null;
    toCompare(): ((o1: any, o2: any) => number) | null;
}
export interface IQueryAggregation {
    operator: string;
    property: string;
    isCount: boolean;
    alias: string;
}
export declare class QueryAggregation extends QueryNode implements IQueryAggregation {
    static readonly count: string;
    static readonly sum: string;
    static readonly average: string;
    static readonly min: string;
    static readonly max: string;
    private getCount();
    private getSum();
    private getAverage();
    private getMin();
    private getMax();
    operator: string;
    property: string;
    isCount: boolean;
    alias: string;
    constructor(x: IQueryAggregation);
    constructor(operator: string, property: string, alias: string);
    toString(): string | null;
    toQuery(): IAggregation;
}
export interface IQueryGrouping {
    keys: Array<string>;
    aggregations: Array<IQueryAggregation>;
}
export declare class QueryGrouping extends QueryNode implements IQueryGrouping {
    keys: Array<string>;
    aggregations: Array<QueryAggregation>;
    constructor(origin?: IQueryGrouping);
    private encodeGroups();
    private encodeAggrgates();
    toString(): string | null;
    toQuery(): (input: any[]) => any[];
}
export interface IEndpoint extends Endpoint {
}
export declare class Endpoint implements IEndpoint {
    static Get: string;
    static Post: string;
    static Put: string;
    static Delete: string;
    static Patch: string;
    baseUrl: string;
    verb: string;
    accpetsJson: boolean;
    returnsJson: boolean;
    bearerToken: string | null;
    constructor(x: IEndpoint);
    constructor(baseUrl: string, verb: string, accpetsJson?: boolean, returnsJson?: boolean, bearerToken?: string | null);
}
export interface IQueryDescription {
    skip: number | null;
    take: number;
    page: number;
    search: IQuerySearch;
    filter: IQueryFilterBooleanOperator;
    grouping: IQueryGrouping;
    sorting: Array<IQuerySortingCondition>;
    attachedTo: IEndpoint;
}
export declare class QueryDescription implements IQueryDescription {
    private static filterName;
    private static applyName;
    private static sortingName;
    private static searchName;
    private static topName;
    private static skipName;
    protected urlEncode: (x: string) => string;
    customUrlEncode(func: (x: string) => string): void;
    skip: number | null;
    take: number;
    page: number;
    search: QuerySearch;
    filter: QueryFilterBooleanOperator;
    grouping: QueryGrouping;
    sorting: Array<QuerySortingCondition>;
    attachedTo: Endpoint;
    static fromJson(x: string): QueryDescription;
    constructor(origin: IQueryDescription);
    queryString(): string | null;
    addToUrl(url: string | null): string | null;
    toString(): string | null;
    toQuery(): (o: Array<any>) => Array<any>;
}
