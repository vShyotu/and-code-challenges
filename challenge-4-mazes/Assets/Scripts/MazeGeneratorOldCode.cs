// public GameObject[] mazePieces = new GameObject[16];

  // void GenerateMaze()
  // {
  //   List<Cell> unvisited = new List<Cell>();
  //   Stack<Cell> stack = new Stack<Cell>();

  //   maze = new int[width, height];

  //   for (int x = 0; x < width; x++) {
  //     for (int y = 0; y < height; y++) {
  //       unvisited.Add(new Cell(x, y));
  //       maze[x,y] = N|E|S|W;
  //     }
  //   }

  //   var current = new Cell(0, 0);
  //   unvisited.Remove(current);

  //   while (unvisited.Count > 0) {
  //     List<Cell> unvisitedNeighbours = GetUnvisitedNeighbours(current.X, current.Y, unvisited);
  //     if (unvisitedNeighbours.Count > 0) {
  //       // Choose a random neighbour
  //       Cell next = unvisitedNeighbours[Random.Range(0, unvisitedNeighbours.Count)];
  //       stack.Push(current);

  //       int direction = 0;

  //       if (current.X > next.X) {
  //         direction = W;  
  //       } else if (current.X < next.X) {
  //         direction = E;
  //       } else if (current.Y > next.Y) {
  //         direction = S;
  //       } else if (current.Y < next.Y) {
  //         direction = N;
  //       }

  //       int oppositeDirection = 0;
        
  //       if (direction == N) {
  //         oppositeDirection = S;
  //       } else if (direction == S) {
  //         oppositeDirection = N;
  //       } else if (direction == E) {
  //         oppositeDirection = W;
  //       } else if (direction == W) {
  //         oppositeDirection = E;
  //       }

  //       //Remove walls from both cells
  //       maze[current.X, current.Y] -= direction;
  //       maze[next.X, next.Y] -= oppositeDirection;

  //       // Set current to be next
  //       current = next;
  //       // Remove from unvisited list.
  //       unvisited.Remove(current);

  //     } else if (stack.Count > 0) {
  //       current = stack.Pop();
  //     }
  //   }
  // }

  // List<Cell> GetUnvisitedNeighbours(int x, int y, List<Cell> unvisited)
  // {
  //   List<Cell> list = new List<Cell>();

  //   //North
  //   if (y + 1 < height)
  //   {
  //     Cell northCell = new Cell(x, y + 1);
  //     if (unvisited.Contains(northCell))
  //     {
  //       list.Add(northCell);
  //     }
  //   }

  //   //South
  //   if (y - 1 > 0)
  //   {
  //     Cell southCell = new Cell(x, y - 1);
  //     if (unvisited.Contains(southCell))
  //     {
  //       list.Add(southCell);
  //     }
  //   }
  //   //East
  //   if (x + 1 < width)
  //   {
  //     Cell eastCell = new Cell(x + 1, y);
  //     if (unvisited.Contains(eastCell))
  //     {
  //       list.Add(eastCell);
  //     }
  //   }

  //   //West
  //   if (x - 1 < width)
  //   {
  //     Cell westCell = new Cell(x - 1, y);
  //     if (unvisited.Contains(westCell))
  //     {
  //       list.Add(westCell);
  //     }
  //   }

  //   return list;
  // }

  // void GenerateMap(int[,] maze) {
  //   map = new int[width, height];

  //   for (int x = 0; x < width / 2; x++) {
  //     for (int y = 0; y < height / 2; y++) {
  //       map[2 * x,     2 * y    ] = 1;
  //       Object.Instantiate(wallAsset, new Vector3(2 * x, 0, 2 * y), Quaternion.identity);
        
  //       if (2 * x + 1 < width * 2) {
  //         map[2 * x + 1, 2 * y    ] = S & maze[x,y];
  //         if (map[2 * x + 1, 2 * y] == 0) {
  //           Object.Instantiate(floorAsset, new Vector3(2 * x + 1, 0, 2 * y), Quaternion.identity);
  //         } else {
  //           Object.Instantiate(wallAsset, new Vector3(2 * x + 1, 0, 2 * y), Quaternion.identity);
  //         }
  //       }

  //       if (2 * y + 1 < height * 2) {
  //         map[2 * x    , 2 * y + 1] = W & maze[x,y];
  //         if (map[2 * x, 2 * y + 1] == 0) {
  //           Object.Instantiate(floorAsset, new Vector3(2 * x, 0, 2 * y + 1), Quaternion.identity);
  //         } else {
  //           Object.Instantiate(wallAsset, new Vector3(2 * x, 0, 2 * y + 1), Quaternion.identity);
  //         }
  //       }

  //       if (2 * x + 1 < width * 2 && 2 * y + 1 < height * 2) {
  //         map[2 * x + 1, 2 * y + 1] = 0;
  //         Object.Instantiate(floorAsset, new Vector3(2 * x + 1, 0, 2 * y + 1), Quaternion.identity);
  //       }
  //     }
  //   }
  // }

  // void GenerateMapv2(int[,] maze) {
  //   for (int x = 0; x < width; x++) {
  //     for (int y = 0; y < height; y++) {
  //       GameObject.Instantiate(mazePieces[maze[x,y]], new Vector3(x, 0, y), Quaternion.identity);
  //     }
  //   }
  // }

  // List<Cell> GetNeighbours(int x, int y, int[,] maze) {
  //   List<Cell> neighbours = new List<Cell>();

  //   if (x > 1 && maze[x - 2, y] == 1) {
  //     neighbours.Add(new Cell(x - 2, y));
  //   }

  //   if (x < width - 3 && maze[x + 2, y] == 1) {
  //     neighbours.Add(new Cell(x + 2, y));
  //   }

  //   if (y > 1 && maze[x, y - 2] == 1) {
  //     neighbours.Add(new Cell(x, y - 2));
  //   }

  //   if (y < height - 3 && maze[x, y + 2] == 1) {
  //     neighbours.Add(new Cell(x, y + 2));
  //   }

  //   return neighbours;
  // }

  // void GenerateMazev2()
  // {
  //   maze = new int[width, height];
  //   for (int x = 0; x < width; x++) {
  //     for (int y = 0; y < height; y++) {
  //       maze[x,y] = 1;
  //     }
  //   }

  //   var current = new Cell(1, 1);

  //   Stack<Cell> stack = new Stack<Cell>();
  //   maze[current.X, current.Y] = 0;
    
  //   stack.Push(current);

  //   while (stack.Count > 0) {
  //     current = stack.Peek();
  //     List<Cell> unvisitedNeighbours = GetNeighbours(current.X, current.Y, maze);
      
  //     if (unvisitedNeighbours.Count > 0) {
  //       Cell next = unvisitedNeighbours[Random.Range(0, unvisitedNeighbours.Count)];

  //       maze[next.X, next.Y] = 0;
  //       maze[(next.X + current.X) / 2, (next.Y + current.Y) / 2] = 0;

  //       stack.Push(next);
  //     } else {
  //       stack.Pop();
  //     }
  //   }
  // }

    // List<Cell> UpdateNeighbours(int x, int y, int[,] maze) {
  //   var unvisitedNeighbours = new List<Cell>();

  //   if(y + 1 < maze.GetLength(1) - 1 
  //     && GetValueOrDefault(x    , y + 1, maze, 1) == 1
  //     && GetValueOrDefault(x - 1, y + 1, maze, 1) == 1 
  //     && GetValueOrDefault(x + 1, y + 1, maze, 1) == 1 
  //     && GetValueOrDefault(x    , y + 2, maze, 1) == 1
  //   ) {
  //     unvisitedNeighbours.Add(new Cell(x, y + 1));
  //   }

  //   if(x + 1 < maze.GetLength(0) - 1 
  //     && GetValueOrDefault(x + 1, y    , maze, 1) == 1
  //     && GetValueOrDefault(x + 1, y + 1, maze, 1) == 1 
  //     && GetValueOrDefault(x + 1, y - 1, maze, 1) == 1 
  //     && GetValueOrDefault(x + 2, y    , maze, 1) == 1
  //   ) {
  //     unvisitedNeighbours.Add(new Cell(x + 1, y));
  //   }

  //   if(y - 1 > 0 
  //     && GetValueOrDefault(x    , y - 1, maze, 1) == 1
  //     && GetValueOrDefault(x - 1, y - 1, maze, 1) == 1 
  //     && GetValueOrDefault(x + 1, y - 1, maze, 1) == 1 
  //     && GetValueOrDefault(x    , y - 2, maze, 1) == 1
  //   ) {
  //     unvisitedNeighbours.Add(new Cell(x, y - 1));
  //   }

  //   if(x - 1 > 0 
  //     && GetValueOrDefault(x - 1, y    , maze, 1) == 1
  //     && GetValueOrDefault(x - 1, y + 1, maze, 1) == 1 
  //     && GetValueOrDefault(x - 1, y - 1, maze, 1) == 1 
  //     && GetValueOrDefault(x - 2, y    , maze, 1) == 1
  //   ) {
  //     unvisitedNeighbours.Add(new Cell(x - 1, y));
  //   }

  //   return unvisitedNeighbours;
  // }

  // List<Cell> UpdateNeighbours(int x, int y, int[,] maze) {
  //   var unvisitedNeighbours = new List<Cell>();

  //   if(y + 1 < maze.GetLength(1) - 1 
  //     && GetValueOrDefault(x    , y + 1, maze, 1) == 1
  //     && GetValueOrDefault(x - 1, y + 2, maze, 1) == 1 
  //     && GetValueOrDefault(x + 1, y + 2, maze, 1) == 1 
  //     && GetValueOrDefault(x    , y + 2, maze, 1) == 1
  //   ) {
  //     unvisitedNeighbours.Add(new Cell(x, y + 1));
  //   }

  //   if(x + 1 < maze.GetLength(0) - 1 
  //     && GetValueOrDefault(x + 1, y    , maze, 1) == 1
  //     && GetValueOrDefault(x + 2, y + 1, maze, 1) == 1 
  //     && GetValueOrDefault(x + 2, y - 1, maze, 1) == 1 
  //     && GetValueOrDefault(x + 2, y    , maze, 1) == 1
  //   ) {
  //     unvisitedNeighbours.Add(new Cell(x + 1, y));
  //   }

  //   if(y - 1 > 0 
  //     && GetValueOrDefault(x    , y - 1, maze, 1) == 1
  //     && GetValueOrDefault(x - 1, y - 2, maze, 1) == 1 
  //     && GetValueOrDefault(x + 1, y - 2, maze, 1) == 1 
  //     && GetValueOrDefault(x    , y - 2, maze, 1) == 1
  //   ) {
  //     unvisitedNeighbours.Add(new Cell(x, y - 1));
  //   }

  //   if(x - 1 > 0 
  //     && GetValueOrDefault(x - 1, y    , maze, 1) == 1
  //     && GetValueOrDefault(x - 2, y + 1, maze, 1) == 1 
  //     && GetValueOrDefault(x - 2, y - 1, maze, 1) == 1 
  //     && GetValueOrDefault(x - 2, y    , maze, 1) == 1
  //   ) {
  //     unvisitedNeighbours.Add(new Cell(x - 1, y));
  //   }

  //   return unvisitedNeighbours;
  // }
  