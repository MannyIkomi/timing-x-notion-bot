import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const TIMING_API_TOKEN = process.env.TIMING_API_TOKEN;

const fetchOptions = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${TIMING_API_TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
};

export async function getProjectTimeEntries(projectId, options = {}) {
  const {
    isRunning = false,
    includeProjectData = false,
    includeChildProjects = true,
    includeTeamMembers = false,
  } = options;
  if (!projectId) {
    throw new Error('A projectId is required');
  }
  try {
    const queryParams = new URLSearchParams({
      is_running: isRunning,
      include_project_data: includeProjectData,
      include_child_projects: includeChildProjects,
      include_team_members: includeTeamMembers,
    });
    const entriesUrl = `https://web.timingapp.com/api/v1/time-entries?projects[]=${projectId}&${queryParams.toString()}`;
    console.log(queryParams);

    const response = await fetch(entriesUrl, fetchOptions);
    console.log(`✅ Fetched timing entries`);

    return response.json();
  } catch (error) {
    throw error;
  }
}
