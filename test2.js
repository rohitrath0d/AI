// Define the map of Romania with distances between cities
const romaniaMap = {
    'Arad': {'Zerind': 75, 'Timisoara': 118, 'Sibiu': 140},
    'Zerind': {'Arad': 75, 'Oradea': 71},
    'Timisoara': {'Arad': 118, 'Lugoj': 111},
    'Sibiu': {'Arad': 140, 'Oradea': 151, 'Fagaras': 99, 'Rimnicu Vilcea': 80},
    'Oradea': {'Zerind': 71, 'Sibiu': 151},
    'Lugoj': {'Timisoara': 111, 'Mehadia': 70},
    'Fagaras': {'Sibiu': 99, 'Bucharest': 211},
    'Rimnicu Vilcea': {'Sibiu': 80, 'Pitesti': 97, 'Craiova': 146},
    'Mehadia': {'Lugoj': 70, 'Drobeta': 75},
    'Drobeta': {'Mehadia': 75, 'Craiova': 120},
    'Craiova': {'Drobeta': 120, 'Rimnicu Vilcea': 146, 'Pitesti': 138},
    'Pitesti': {'Rimnicu Vilcea': 97, 'Craiova': 138, 'Bucharest': 101},
    'Bucharest': {'Fagaras': 211, 'Pitesti': 101, 'Giurgiu': 90, 'Urziceni': 85},
    'Giurgiu': {'Bucharest': 90},
    'Urziceni': {'Bucharest': 85, 'Hirsova': 98, 'Vaslui': 142},
    'Hirsova': {'Urziceni': 98, 'Eforie': 86},
    'Eforie': {'Hirsova': 86},
    'Vaslui': {'Urziceni': 142, 'Iasi': 92},
    'Iasi': {'Vaslui': 92, 'Neamt': 87},
    'Neamt': {'Iasi': 87}
};

class Node {
    constructor(city, cost, parent = null) {
        this.city = city;
        this.cost = cost;
        this.parent = parent;
    }
}

// Priority Queue using a min-heap
class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(node) {
        this.nodes.push(node);
        this.nodes.sort((a, b) => a.cost - b.cost);
    }

    dequeue() {
        return this.nodes.shift();
    }

    isEmpty() {
        return this.nodes.length === 0;
    }
}

function heuristic(node, goal) {
    return 0;  // No need for heuristic in this case
}

function astarSearch(graph, start, goal) {
    const openList = new PriorityQueue();
    const closedSet = new Set();
    openList.enqueue(start);

    while (!openList.isEmpty()) {
        const currentNode = openList.dequeue();

        if (currentNode.city === goal.city) {
            const path = [];
            let node = currentNode;
            while (node) {
                path.push(node.city);
                node = node.parent;
            }
            return path.reverse();
        }

        closedSet.add(currentNode.city);

        const neighbors = graph[currentNode.city];
        for (const neighbor in neighbors) {
            if (!closedSet.has(neighbor)) {
                const newCost = currentNode.cost + neighbors[neighbor];
                const newNode = new Node(neighbor, newCost, currentNode);
                openList.enqueue(newNode);
            }
        }
    }

    return null;  // No path found
}

const startCity = 'Arad';
const goalCity = 'Bucharest';
const startNode = new Node(startCity, 0);
const goalNode = new Node(goalCity, 0);

const path = astarSearch(romaniaMap, startNode, goalNode);

if (path) {
    console.log("Path found:", path);
} else {
    console.log("No path found");
}
