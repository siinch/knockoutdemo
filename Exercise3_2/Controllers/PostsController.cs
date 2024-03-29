﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Exercise3_2.DataAccessLayer;
using Microsoft.AspNetCore.Mvc;

namespace Exercise3_2.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostsController : ControllerBase
    {
        private readonly IDataService _dataService;

        public PostsController(IDataService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet(Name = nameof(GetPosts))]
        public ActionResult GetPosts(int page = 0, int pageSize = 10)
        {
            var posts = _dataService.GetPosts(page, pageSize)
                .Select(x => new {
                    Link = Url.Link(nameof(GetPost), new { x.Id }),
                    x.Title
                });
            var total = _dataService.NumberOfQuestions();
            var pages = Math.Ceiling(total / (double)pageSize);
            var prev = page > 0 ? Url.Link(nameof(GetPosts), new { page = page - 1, pageSize }) : null;
            var next = page < pages - 1 ? Url.Link(nameof(GetPosts), new { page = page + 1, pageSize }) : null;

            var result = new
            {
                total,
                pages,
                prev,
                next,
                items = posts
            };

            return Ok(result);
        }

        [HttpGet("{id}", Name = nameof(GetPost))]
        public ActionResult GetPost(int id)
        {
            var post = _dataService.GetPost(id);

            if (post.PostType == 1)
            {
                var result = new
                {
                    Link = Url.Link(nameof(GetPost), new { post.Id }),
                    post.Title,
                    post.CreationDate,
                    post.Score,
                    post.Body,
                    Answers = Url.Link(nameof(GetAnswers), new { post.Id })
                };

                return Ok(result);
            }

            else
            {
                var result = new
                {
                    Link = Url.Link(nameof(GetPost), new { post.Id }),
                    post.Title,
                    post.CreationDate,
                    post.Score,
                    post.Body,
                    Parent = Url.Link(nameof(GetPost), new { id = post.ParentId }),
                };

                return Ok(result);
            }


        }

        [HttpGet("{id}/answers", Name = nameof(GetAnswers))]
        public ActionResult GetAnswers(int id)
        {
            var posts = _dataService.GetAnswers(id)
                .Select(x => new
                {
                    Link = Url.Link(nameof(GetPost), new { x.Id }),
                    Parent = Url.Link(nameof(GetPost), new { id }),
                    x.Body,
                    x.CreationDate,
                    x.Score
                });

            return Ok(posts);
        }
    }
}
