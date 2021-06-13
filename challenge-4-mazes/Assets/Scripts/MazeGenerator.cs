using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Cell
{
  public int X { get; set; }
  public int Y { get; set; }

  public Cell()
  {
    X = 0;
    Y = 0;
  }

  public Cell(int x, int y)
  {
    X = x;
    Y = y;
  }

  public override bool Equals(System.Object obj)
  {
    if ((obj == null) || !this.GetType().Equals(obj.GetType()))
    {
      return false;
    }
    else
    {
      Cell cell = (Cell)obj;
      return (cell.X == this.X) && (cell.Y == this.Y);
    }
  }

  public override int GetHashCode()
  {
    return (X << 2) ^ Y;
  }

}

[RequireComponent(typeof(LineRenderer))]
public class MazeGenerator : MonoBehaviour
{
  public int width = 30;
  public int height = 30;
  public GameObject floorAsset;
  public GameObject wallAsset;
  public Transform tileParent;
  private int[,] maze;
  private Grid mazeGrid;
  private LineRenderer lineRenderer;
  private List<Node> currentPath;

  void Start()
  {
    lineRenderer = gameObject.GetComponent<LineRenderer>();
    MakeMaze(width, height);
  }

  int GetValueOrDefault(int x, int y, int[,] maze, int def) {
    if (x >= 0 && x < maze.GetLength(0) && y >= 0 && y < maze.GetLength(1)) {
      return maze[x,y];
    } else {
      return def;
    }
  }

  List<Cell> ChooseNeighbour(int x, int y, int[,] maze) {
    var unvisitedNeighbours = new List<Cell>();

    if(y + 1 < maze.GetLength(1) - 1 
      && GetValueOrDefault(x    , y + 1, maze, 1) == 1
      && GetValueOrDefault(x - 1, y + 1, maze, 1) == 1 
      && GetValueOrDefault(x + 1, y + 1, maze, 1) == 1 
      && GetValueOrDefault(x - 1, y + 2, maze, 1) == 1 
      && GetValueOrDefault(x + 1, y + 2, maze, 1) == 1 
      && GetValueOrDefault(x    , y + 2, maze, 1) == 1
    ) {
      unvisitedNeighbours.Add(new Cell(x, y + 1));
    }

    if(x + 1 < maze.GetLength(0) - 1 
      && GetValueOrDefault(x + 1, y    , maze, 1) == 1
      && GetValueOrDefault(x + 1, y + 1, maze, 1) == 1 
      && GetValueOrDefault(x + 1, y - 1, maze, 1) == 1 
      && GetValueOrDefault(x + 2, y + 1, maze, 1) == 1 
      && GetValueOrDefault(x + 2, y - 1, maze, 1) == 1 
      && GetValueOrDefault(x + 2, y    , maze, 1) == 1
    ) {
      unvisitedNeighbours.Add(new Cell(x + 1, y));
    }

    if(y - 1 > 0 
      && GetValueOrDefault(x    , y - 1, maze, 1) == 1
      && GetValueOrDefault(x - 1, y - 1, maze, 1) == 1 
      && GetValueOrDefault(x + 1, y - 1, maze, 1) == 1 
      && GetValueOrDefault(x - 1, y - 2, maze, 1) == 1 
      && GetValueOrDefault(x + 1, y - 2, maze, 1) == 1 
      && GetValueOrDefault(x    , y - 2, maze, 1) == 1
    ) {
      unvisitedNeighbours.Add(new Cell(x, y - 1));
    }

    if(x - 1 > 0 
      && GetValueOrDefault(x - 1, y    , maze, 1) == 1
      && GetValueOrDefault(x - 1, y + 1, maze, 1) == 1 
      && GetValueOrDefault(x - 1, y - 1, maze, 1) == 1
      && GetValueOrDefault(x - 2, y + 1, maze, 1) == 1 
      && GetValueOrDefault(x - 2, y - 1, maze, 1) == 1 
      && GetValueOrDefault(x - 2, y    , maze, 1) == 1
    ) {
      unvisitedNeighbours.Add(new Cell(x - 1, y));
    }

    return unvisitedNeighbours;
  }
  
  int[,] GenerateMaze(int width, int height) {

    int[,] maze = new int[width, height];

    for (int x = 0; x < width; x++)
    {
      for (int y = 0; y < height; y++)
      {
        maze[x, y] = 1;
      }
    }

    var current = new Cell(1, 1);

    List<Cell> floor = new List<Cell>();

    Stack<Cell> stack = new Stack<Cell>();
    maze[current.X, current.Y] = 0;
    stack.Push(current);

    while(stack.Count > 0) {
      current = stack.Peek();
      List<Cell> unvisitedNeighbours = ChooseNeighbour(current.X, current.Y, maze);

      if (unvisitedNeighbours.Count > 0) {
        Cell next = unvisitedNeighbours[Random.Range(0, unvisitedNeighbours.Count)];

        maze[next.X, next.Y] = 0;
        maze[(next.X + current.X) / 2, (next.Y + current.Y) / 2] = 0;

        stack.Push(next);
      } else {
        stack.Pop();
      }
    }

    return maze;
  }
  
  void MakeMaze(int width, int height) {
    int [,] maze = GenerateMaze(width, height);
    
    //Entrance Cell
    Node start = new Node(true, new Vector3(0, 0, 0), 0, 0);
    for (int i = 0; i < width; i++) {
      if (maze[i, 1] == 0) {
        start.gridX = i;
        start.worldPosition.x = i;
        break;
      }
    }

    //Exit Cell
    Node end = new Node(true, new Vector3(0, 0, height - 1), 0, height -1);
    for (int i = width - 1; i >= 0; i--) {
      if (maze[i, height - 2] == 0) {
        end.gridX = i;
        end.worldPosition.x = i;
        break;
      }
    }
    
    maze[start.gridX, start.gridY] = 0;
    maze[end.gridX, end.gridY] = 0;

    BuildTilemap(maze);

    mazeGrid = new Grid(maze);
    currentPath = AStar.FindPath(start.worldPosition, end.worldPosition, mazeGrid);

    BuildLineRendererPath(currentPath);
  }

  void BuildTilemap(int[,] maze) {
    for (int x = 0; x < width; x++)
    {
        for (int y = 0; y < height; y++)
        {
            if (maze[x, y] == 1) {
              GameObject.Instantiate(wallAsset, new Vector3(x, 0, y), Quaternion.identity, tileParent);
            } else if (maze[x, y] == 0) {
              GameObject.Instantiate(floorAsset, new Vector3(x, 0, y), Quaternion.identity, tileParent);
            }
        }
    }
  }

  void BuildLineRendererPath(List<Node> path) {
    Vector3[] positions = new Vector3[path.Count];
    for (int i = 0; i < path.Count; i++)
    {
      positions[i] = new Vector3(path[i].gridX, 0, path[i].gridY) + Vector3.one/2;
    }

    lineRenderer.positionCount = positions.Length;
    lineRenderer.SetPositions(positions);
  }

  void ClearCurrentMaze() {
    Transform transform;
    for (int i = 0; i < tileParent.transform.childCount; i++) {
      transform = tileParent.transform.GetChild(i);
      GameObject.Destroy(transform.gameObject);
    }
  }

  public void OnGenerateClicked() {
    ClearCurrentMaze();
    MakeMaze(width, height);
  }
  
  public void OnWidthChanged(string value) {
    int parsed;
    bool success = System.Int32.TryParse(value, out parsed);

    if (success) {
      if (parsed > 2) {
        width = parsed;
      }
    }
  }

  public void OnHeightChanged(string value) {
    int parsed;
    bool success = System.Int32.TryParse(value, out parsed);

    if (success) {
      if (parsed > 2) {
        height = parsed;
      }
    }
  }

  public void OnDrawGizmos() {
    if (mazeGrid != null) {
      foreach(Node n in mazeGrid.grid) {
        Gizmos.color = n.walkable ? Color.white : Color.red;

        if (currentPath != null) {
          if (currentPath.Exists(x => x.gridX == n.gridX && x.gridY == n.gridY))
          {
            Gizmos.color = Color.black;
          }
        }

        Gizmos.DrawCube(n.worldPosition + Vector3.one/2, Vector3.one);
      }
    }
  }
}
