using Microsoft.AspNetCore.Mvc;
using MyReactApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace MyReactApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        // In-memory storage for todo items
        private static List<Todo> todos = new List<Todo>();

        // GET: api/todo
        [HttpGet]
        public ActionResult<IEnumerable<Todo>> Get()
        {
            // Return all todo items
            return Ok(todos);
        }

        // GET: api/todo/{id}
        [HttpGet("{id}")]
        public ActionResult<Todo> GetById(int id)
        {
            var todo = todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound(); // Return 404 Not Found if todo item with the specified ID is not found
            }
            return Ok(todo); // Return 200 OK with the todo item if found
        }


        // POST: api/todo
        [HttpPost]
        public ActionResult<Todo> Post(Todo todo)
        {
            // Assign an ID to the todo item
            todo.Id = todos.Count + 1;
            // Add the new todo item to the list
            todos.Add(todo);
            // Return a response indicating success and the newly created todo item
            return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
        }

        // PUT: api/todo/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, Todo todo)
        {
            // Find the existing todo item by ID
            var existingTodo = todos.FirstOrDefault(t => t.Id == id);
            // If the todo item doesn't exist, return a not found response
            if (existingTodo == null)
                return NotFound();
            
            // Update the text and completion status of the existing todo item
            existingTodo.Text = todo.Text;
            existingTodo.Completed = todo.Completed;
            // Return a successful response
            return NoContent();
        }

        // DELETE: api/todo/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Find the todo item to delete by ID
            var todo = todos.FirstOrDefault(t => t.Id == id);
            // If the todo item doesn't exist, return a not found response
            if (todo == null)
                return NotFound();

            // Remove the todo item from the list
            todos.Remove(todo);
            // Return a successful response
            return NoContent();
        }
    }
}
