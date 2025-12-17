import { describe, expect, it, beforeEach } from "vitest";
import { createMockH3Event } from "../mock/h3-event";
import { useH3TestUtils } from "../setup";
import ProjectModel from "../../server/models/project";

// Import our test utilities

const { defineEventHandler } = useH3TestUtils();

describe("GET /api/projects", async () => {
  // 3. Dynamically import the handler *after* mocks are set up
  const handler = await import("../../server/api/projects.get");

  beforeEach(async () => {
    // Clear database
    await ProjectModel.deleteMany({});
  });

  it("return success response for valid request", async () => {
    // Create test project
    await ProjectModel.create({
      title: "Test Project",
      slug: "test-project",
      description: "Test description",
      tags: ["test"],
      published: true,
      order: 1,
      content: [],
    });

    const event = createMockH3Event({
      method: "GET",
      url: "api/projects",
    });

    const response = await handler.default(event);

    expect(Array.isArray(response)).toBe(true);
    expect(response).toHaveLength(1);
    const project = response[0];
    expect(project).toHaveProperty("_id");
    expect(project.title).toBe("Test Project");
    expect(project.slug).toBe("test-project");
    expect(project.description).toBe("Test description");
    expect(project.tags).toEqual(["test"]);
  });

  it("should support pagination", async () => {
    // Create multiple test projects
    await ProjectModel.create({
      title: "Project 1",
      slug: "project-1",
      description: "Description 1",
      tags: ["tag1"],
      published: true,
      order: 1,
      content: [],
    });
    await ProjectModel.create({
      title: "Project 2",
      slug: "project-2",
      description: "Description 2",
      tags: ["tag2"],
      published: true,
      order: 2,
      content: [],
    });
    await ProjectModel.create({
      title: "Project 3",
      slug: "project-3",
      description: "Description 3",
      tags: ["tag3"],
      published: true,
      order: 3,
      content: [],
    });
    await ProjectModel.create({
      title: "Project 4",
      slug: "project-4",
      description: "Description 4",
      tags: ["tag4"],
      published: true,
      order: 4,
      content: [],
    });
    await ProjectModel.create({
      title: "Project 5",
      slug: "project-5",
      description: "Description 5",
      tags: ["tag5"],
      published: true,
      order: 5,
      content: [],
    });

    // Test skip and limit
    const eventSkipLimit = createMockH3Event({
      method: "GET",
      url: "api/projects?skip=2&limit=4",
    });
    const responseSkipLimit = await handler.default(eventSkipLimit);

    expect(responseSkipLimit[0].title).toBe("Project 3");
  });
});
