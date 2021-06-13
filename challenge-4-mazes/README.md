# Challenge 4 - Mazes

## Instructions for running

Built and useable at https://vshyotu.github.io/MazeGen/

## Instructions

* You can specify a width and height and click generate, the minimum is 3, setting an invalid value or value lower than this won't be accepted - it will use the last valid value entered.
* LMB - click and drag to pan the maze, and scroll wheel to zoom in/out.
* RMB - Reset camera
* You can click the 'Show solution' toggle to show/hide the path that solves the maze.

## Code
Implemented as a stack-based backtracker algorithm with A* pathfinding for solving (Did not use Unity's pathfinding agents). Uses a step size of 1 cell and fills the space as best as possible without causing loops.

Not the cleanest code I've written but works - definitely in need of a refactor but couldn't spend too long on it.

Relevant code files:
* /Assets/Scripts/AStar.cs
* /Assets/Scripts/MazeGenerator.cs
* /Assets/Scripts/CameraPan.cs

