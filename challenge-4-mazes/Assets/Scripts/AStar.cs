using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AStar
{
    public static List<Node> FindPath(Vector3 startPos, Vector3 endPos, Grid grid) {
        List<Node> openSet = new List<Node>();
        HashSet<Node> closedSet = new HashSet<Node>();

        Node startNode = grid.grid[(int) startPos.x, (int) startPos.z];
        Node endNode = grid.grid[(int) endPos.x, (int) endPos.z];
        openSet.Add(startNode);

        while(openSet.Count > 0) {
            Node node = openSet[0];
            for (int i = 1; i < openSet.Count; i++)
            {
                if (openSet[i].fCost < node.fCost || openSet[i].fCost == node.fCost) {
                    if(openSet[i].hCost < node.hCost) {
                        node = openSet[i];
                    }
                }
            }

            openSet.Remove(node);
            closedSet.Add(node);

            if(node.gridX == endNode.gridX && node.gridY == endNode.gridY) {
                //Found path
                Debug.Log("Found path, retracing!");
                return RetracePath(startNode, endNode, grid);
            }

            foreach (Node neighbour in grid.GetNeighbours(node)) 
            {
                if (!neighbour.walkable || closedSet.Contains(neighbour)) 
                {
                    continue;
                }

                int newMovementCostToNeighbour = node.gCost + GetDistance(node, neighbour);

                if (newMovementCostToNeighbour < neighbour.gCost || !openSet.Contains(neighbour)) 
                {
                    neighbour.gCost = newMovementCostToNeighbour;
                    neighbour.hCost = GetDistance(neighbour, endNode);
                    neighbour.parent = node;

                    if(!openSet.Contains(neighbour)) {
                        openSet.Add(neighbour);
                    }

                }
            }
        }

        // No path found
        List<Node> path = new List<Node>();
        return path;
    }

    static List<Node> RetracePath(Node startNode, Node endNode, Grid grid) {
        List<Node> path = new List<Node>();
        Node currentNode = endNode;

        while (currentNode != null) {
            path.Add(currentNode);
            currentNode = currentNode.parent;
        }

        path.Add(startNode);

        path.Reverse();
        return path;
    }

    //Manhattan distance as distance heuristic
    static int GetDistance(Node nodeA, Node nodeB) {
        return 10 * (Mathf.Abs(nodeA.gridX - nodeB.gridX) + Mathf.Abs(nodeA.gridY - nodeB.gridY));
    }
}

public class Node {
    public bool walkable;
    public Vector3 worldPosition;
    public int gridX;
    public int gridY;
    public int gCost;
    public int hCost;
    public int fCost { 
        get { 
            return gCost+hCost; 
        } 
    }

    public Node parent;

    public Node(bool walkable, Vector3 worldPosition, int gridX, int gridY) {
        this.walkable = walkable;
        this.worldPosition = worldPosition; 
        this.gridX = gridX;
        this.gridY = gridY;
    }
}

public class Grid {
    public Vector2 dimensions;
    public Node[,] grid;
    int gridSizeX;
    int gridSizeY;

    public Grid(int [,] map) {
        dimensions = new Vector2(map.GetLength(0), map.GetLength(1));
        gridSizeX = map.GetLength(0);
        gridSizeY = map.GetLength(1);

        Node[,] grid = new Node[map.GetLength(0), map.GetLength(1)];

        for(int x = 0; x < map.GetLength(0); x++) {
            for (int y = 0; y < map.GetLength(1); y++)
            {
                grid[x,y] = new Node(map[x,y] == 0, new Vector3(x,0,y), x, y);
            }
        }

        this.grid = grid;
    }

    private bool InGrid(int x, int y) {
        return x >= 0 && x < gridSizeX && y >= 0 && y < gridSizeY;
    }
    public List<Node> GetNeighbours(Node node) {
        List<Node> neighbours = new List<Node>();

        //Check North (node.gridX, node.gridY + 1)
        if (InGrid(node.gridX, node.gridY + 1)) {
            neighbours.Add(grid[node.gridX, node.gridY + 1]);
        }

        //Check East (node.gridX + 1, node.gridY)
        if (InGrid(node.gridX + 1, node.gridY)) {
            neighbours.Add(grid[node.gridX + 1, node.gridY]);
        }

        //Check South (node.gridX, node.gridY - 1)
        if (InGrid(node.gridX, node.gridY - 1)) {
            neighbours.Add(grid[node.gridX, node.gridY - 1]);
        }

        //Check West (node.gridX - 1, node.gridY)
        if (InGrid(node.gridX - 1, node.gridY)) {
            neighbours.Add(grid[node.gridX - 1, node.gridY]);
        }

        return neighbours;
    }
}
