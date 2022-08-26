import { PLUS, MULTIPLY } from "../../constants";

export class Graph {
    constructor() {
        this.graph = {};
    };

    addVertex(value) {
        this.graph[value] = {};
    };

    addEdge(start, end, weight) {
        this.graph[start] = {
            ...this.graph[start],
            [end]: weight
        }
    };
};

// Finding the lowest not processed node
const findLowestCostNode = (costs, processed) => {
    let lowestCost = Infinity;
    let lowestCostNode = undefined;

    Object.keys(costs).forEach(n => {
        if (processed.indexOf(n) !== -1) return;

        if (costs[n] < lowestCost) {
            lowestCost = costs[n];
            lowestCostNode = n;
        }
    });

    return lowestCostNode;
}
  
// Getting parents chain for the nodes
const getParentsChain = (start, finish, parents) => {
    let parent = parents[finish];
    let chain = [finish];

    if (!parents[finish]) return '';

    while (parent !== start) {
        chain.push(parent);
        parent = parents[parent];
    }

    chain.push(parent);
    chain = chain.reverse().join(' | ');

    return chain;
};

const getNewCost = (cost, neighborCost, method = PLUS) => {
    switch (method) {
        case PLUS:
            return cost + neighborCost;
        case MULTIPLY:
            return cost * neighborCost;
        default:
            return cost + neighborCost;
    }
};

export const dijkstra = ({ graph }, start, finish, method) => {
    if (!graph[start]) {
        throw new Error("There is no any start node");
    }

    if (!graph[finish]) {
        throw new Error("There is no any finish node");
    }

    // Generate the table of counted costs and parents
    const costs = {};
    const parents = {};

    // Already processed nodes
    const processed = [];

    // Feel the default data
    Object.keys(graph).forEach(n => {
        costs[n] = Infinity;
        parents[n] = undefined;
    });

    // Feel the data for start node neighbors
    Object.keys(graph[start]).forEach(n => {
        costs[n] = graph[start][n];
        parents[n] = start;
    });

    // Find the lowest not processed node
    let node = findLowestCostNode(costs, processed);

    while (node) {
        // The lowest cost to the node
        const cost = costs[node];
        // Neighbors of the node
        const neighbors = graph[node];

        // Update neighbors cost
        // eslint-disable-next-line no-loop-func
        Object.keys(neighbors).forEach(n => {
            const newCost = getNewCost(cost, neighbors[n], method);

            if (costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        })

        // Add node to processed
        processed.push(node);

        // find the lowest processed node
        node = findLowestCostNode(costs, processed);
    }

    return {
        cost: costs[finish],
        path: getParentsChain(start, finish, parents)
    };
};