# What is mvcct-odata?
mvcct-odata is a alightweight JavaScript [OData](http://www.odata.org/) client. It supports just queries, with filter or free search,
sorting, and gtouping+aggregation.

Queries are represented as nested objects with JavasCript methods to get their corresponding OData string representation.
This way queries are easily built and modified by adding, removing substituting and editing plain JavaScript objects.

OData objects with all they methods can be easily extracted from their Json representations, 
so queries can be easily exchanged with the server and stored in all browser storage types
(cookies, local storage, etc.).

Json representation is compatible with the query representation of the [MvcControlsToolkit.Core.OData](https://github.com/MvcControlsToolkit/MvcControlsToolkit.Core/tree/master/src/MvcControlsToolkit.Core.OData) 
Asp.net core package.

## Supported filters
Filter conditions may contain main entity properties and properties of entities directly or indirectly connected with the main entity through a chain of one-to-one or
many-to-one relations.

Conditions may be nested not/and/or combinations of "leaf conditions" containing a relation between a property 
and a constant. The following relations are supported:
>,<, >=, <=, ==, !=, startsWith, endsWith, contains.

## Supported free search
No limitation.

## Supported sorting
Any sorting involving main entity properties and properties of entities directly or indirectly connected with the main entity through a chain of one-to-one or
many-to-one relations is supported.

## Supported grouping/aggregations

The library supports grouping of the type (see [here](http://docs.oasis-open.org/odata/odata-data-aggregation-ext/v4.0/cs01/odata-data-aggregation-ext-v4.0-cs01.html#_Toc378326304) for more infos on OData aggregations):

```
apply=groupby((properti1, property2, ...), 
    aggregate(aproperty1 with <operator1> as res1, aproperty2 with <operator2> as res2,...))

```
Where:
1. property1, property2,..., and aproperty1, aproperty2, ..., may be main entity properties and properties of entities directly or indirectly connected with the main entity through a chain of one-to-one or
many-to-one relations.
2. res1, res2, ... may be just properties of the main destination object (the object used to return all results of the grouping).
3. op1, op2, .., are one of: countdistinct, average, sum, min, max.

 





  