import * as crypto from 'crypto';
import { getInput, setFailed, info } from '@actions/core';
import { fetch } from 'undici';

async function run() {
  try {
    // 1. Read inputs
    const panelApiKey = getInput('panel-api-key', { required: true });
    const panelHost = getInput('panel-host', { required: true });
    const apiVersion = getInput('api-version');
    const containerName = getInput('container-name', { required: true });
    const imageRepo = getInput('image-repo', { required: true });
    const imageVersion = getInput('image-version');

    // 2. Validate API version format
    if (!/^v\d+$/.test(apiVersion)) {
      throw new Error(`Invalid API version: ${apiVersion}. Expected format like 'v1' or 'v2'`);
    }

    // 3. Construct full image reference
    const imageName = imageVersion.includes('sha256:') 
      ? `${imageRepo}@${imageVersion}`  // Digest format
      : `${imageRepo}:${imageVersion}`; // Tag format

    info(`Target image: ${imageName}`);

    // 4. Generate auth token
    const timestamp = Math.floor(Date.now() / 1000);
    const tokenString = `1panel${panelApiKey}${timestamp}`;
    const token = crypto.createHash('md5').update(tokenString).digest('hex');

    // 5. Call 1Panel API
    const apiUrl = `${panelHost}/api/${apiVersion}/containers/upgrade`;
    info(`Calling API: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        '1Panel-Token': token,
        '1Panel-Timestamp': timestamp.toString(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: containerName,
        image: imageName,
        forcePull: true,
      }),
    });

    const data = await response.json();

    // 6. Verify response
    if (data.code !== 200) {
      throw new Error(`API Error: ${JSON.stringify(data)}`);
    }

    info(`✅ Successfully upgraded ${containerName} to ${imageName} (API ${apiVersion})`);
  } catch (error) {
    setFailed(error.message);
  }
}

run();