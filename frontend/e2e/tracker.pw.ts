import { test, expect } from './fixtures'

test('navigates the learning path from an explanation to its slide reference', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Copilot app workflow & project setup' })).toBeVisible()
  await page.getByRole('link', { name: 'Open the hands-on lab' }).click()
  await expect(page.getByRole('heading', { name: 'From prompt to reviewed change' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Check policy before sharing context or granting access' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Check data handling and access policy before prompting' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'What this course covers—and does not' })).toBeVisible()
  await page.getByRole('link', { name: 'Return to the learning path' }).click()
  await page.locator('a[href="/learn/readme"]').click()
  await expect(page.getByRole('heading', { name: 'README.md: a human-friendly starting point' })).toBeVisible()
  await expect(page.getByText('Illustrative scenario', { exact: true })).toBeVisible()
  await expect(page.getByText('What Copilot may do', { exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Slide 12 · Where Each Setup File Fits' }).click()
  await expect(page).toHaveURL(/\/slides#slide-12$/)
  await expect(page.getByRole('heading', { name: 'Where Each Setup File Fits' })).toBeVisible()
})

test('exposes a keyboard skip link to the main content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main-content$/)
})

test('checks understanding and persists course progress in the browser', async ({ page }) => {
  await page.goto('/learn/session-modes')
  await page.getByRole('radio', { name: 'It prepares a plan for you to review before execution.' }).click()
  await page.getByRole('button', { name: 'Check answer' }).click()

  await expect(page.getByText(/That’s right\./)).toBeVisible()
  await page.goto('/')
  await expect(page.getByText('1 of 16 lessons')).toBeVisible()
})

test('every course topic includes its explanation, worked scenario, visual, practice, and slides', async ({ page }) => {
  const slugs = [
    'why-setup-files', 'readme', 'agents-md', 'copilot-instructions', 'path-specific',
    'architecture-overview', 'skills', 'putting-it-together', 'session-modes',
    'agent-selection', 'tool-permissions', 'task-environments', 'models-and-fusion',
    'prompt-attachments', 'dictation', 'usage-and-status'
  ]

  for (const slug of slugs) {
    await page.goto(`/learn/${slug}`)
    await expect(page.getByRole('heading', { name: 'In plain language' })).toBeVisible()
    await expect(page.locator('.surface-note')).toBeVisible()
    await expect(page.locator('.applied-exercise')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Expected result' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Validate it' })).toBeVisible()
    await expect(page.locator('.scenario-steps dt')).toHaveText(['What you do', 'What Copilot may do', 'What to review'])
    await expect(page.locator('.course-visual')).toBeVisible()
    await expect(page.locator('.course-visual')).toHaveCSS('display', 'block')
    const comparison = page.locator('.course-visual .visual-comparison')
    if (await comparison.count()) {
      await expect(comparison).toHaveCSS('display', 'grid')
    }
    await expect(page.getByRole('heading', { name: 'Check your understanding' })).toBeVisible()
    await expect(page.locator('.slide-references a').first()).toBeVisible()

    const images = page.locator('.visual-screenshot img')
    for (let index = 0; index < await images.count(); index++) {
      await images.nth(index).scrollIntoViewIfNeeded()
      await expect.poll(() => images.nth(index).evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    }
  }
})

test('provides a collapsible course navigation on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Copilot app workflow & project setup' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)

  await page.goto('/learn/agent-selection')

  const contents = page.getByText('Course contents · Agent selection')
  await expect(contents).toBeVisible()
  await contents.click()
  await expect(page.getByRole('link', { name: 'Skills' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)

  await page.goto('/lab')
  await expect(page.getByRole('heading', { name: 'From prompt to reviewed change' })).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true)
})

test('keeps public course pages independent of the task API', async ({ page }) => {
  const apiRequests: string[] = []
  page.on('request', request => {
    if (new URL(request.url()).pathname.startsWith('/api/')) {
      apiRequests.push(request.url())
    }
  })

  await page.goto('/')
  await page.goto('/lab')
  await page.goto('/learn/session-modes')

  expect(apiRequests).toEqual([])
})

test('shows the guidance lessons and overall progress on the board', async ({ page }) => {
  await page.goto('/practice')

  await expect(page.getByRole('heading', { name: 'Guidance task board' })).toBeVisible()
  await expect(page.getByText('completed in this view')).toBeVisible()

  for (const title of [
    'Add repository-wide agent guidance',
    'Document setup and usage',
    'Write Copilot repository instructions',
    'Scope instructions to file patterns',
    'Map the codebase',
    'Package a reusable skill'
  ]) {
    await expect(page.getByRole('heading', { name: title })).toBeVisible()
  }
})

test('filters tasks by guidance topic and status', async ({ page, taskFactory }) => {
  const task = await taskFactory({ topic: 'skills', status: 'IN_PROGRESS' })
  await page.goto('/practice')

  await page.getByRole('combobox').nth(0).click()
  await page.getByRole('option', { name: 'skills', exact: true }).click()
  await expect(page.getByRole('heading', { name: task.title })).toBeVisible()

  await page.getByRole('combobox').nth(1).click()
  await page.getByRole('option', { name: 'In progress', exact: true }).click()
  await expect(page.getByRole('heading', { name: task.title })).toBeVisible()

  await page.getByRole('combobox').nth(1).click()
  await page.getByRole('option', { name: 'Done', exact: true }).click()
  await expect(page.getByRole('heading', { name: task.title })).toHaveCount(0)
})

test('creates a learning task from the form', async ({ page, trackTask }) => {
  const title = `Playwright create ${Date.now()}`
  await page.goto('/practice')
  await page.getByRole('button', { name: 'New task' }).click()

  await expect(page.getByRole('heading', { name: 'Create a task' })).toBeVisible()
  await page.getByLabel('Task title').fill(title)
  await page.getByRole('combobox').nth(0).click()
  await page.getByRole('option', { name: '.github/instructions/', exact: true }).click()
  await page.getByLabel('Objective').fill('Create a scoped instruction lesson.')
  await page.getByLabel('Checklist (one step per line)').fill('Choose a file pattern\nWrite focused guidance')
  await page.getByRole('combobox').nth(1).click()
  await page.getByRole('option', { name: 'In progress', exact: true }).click()
  await page.getByRole('button', { name: 'Save task' }).click()

  await expect(page.getByRole('heading', { name: title })).toBeVisible()
  await expect(page.getByText('Create a scoped instruction lesson.')).toBeVisible()
  const id = Number(new URL(page.url()).pathname.split('/').pop())
  expect(Number.isInteger(id)).toBe(true)
  trackTask(id)
})

test('updates lesson content and status', async ({ page, taskFactory }) => {
  const task = await taskFactory()
  const updatedTitle = `${task.title} edited`

  await page.goto(`/tasks/${task.id}`)
  await page.getByRole('button', { name: 'Edit' }).click()
  await page.getByLabel('Task title').fill(updatedTitle)
  await page.getByRole('combobox').nth(0).click()
  await page.getByRole('option', { name: 'README.md', exact: true }).click()
  await page.getByLabel('Objective').fill('Explain the project setup to new contributors.')
  await page.getByLabel('Checklist (one step per line)').fill('List prerequisites\nDocument startup')
  await page.getByRole('combobox').nth(1).click()
  await page.getByRole('option', { name: 'Done', exact: true }).click()
  await page.getByRole('button', { name: 'Save task' }).click()

  await expect(page.getByRole('heading', { name: updatedTitle })).toBeVisible()
  await expect(page.getByText('Explain the project setup to new contributors.')).toBeVisible()
  await expect(page.getByText('List prerequisites')).toBeVisible()
  await expect(page.getByRole('combobox')).toHaveText('Done')
})

test('persists checklist completion, status, and notes', async ({ page, taskFactory }) => {
  const task = await taskFactory()
  await page.goto(`/tasks/${task.id}`)

  const firstStep = page.getByRole('checkbox').nth(0)
  const stepUpdate = page.waitForResponse(response =>
    new URL(response.url()).pathname === `/api/tasks/${task.id}/steps/0` &&
    response.request().method() === 'PATCH'
  )
  await firstStep.click()
  expect((await stepUpdate).ok()).toBe(true)
  await expect(firstStep).toBeChecked()
  await page.reload()
  await expect(page.getByRole('checkbox').nth(0)).toBeChecked()

  await page.getByRole('combobox').click()
  await page.getByRole('option', { name: 'Done', exact: true }).click()
  await expect(page.getByRole('combobox')).toHaveText('Done')

  await page.getByPlaceholder('What did you learn?').fill('Repository rules guide Copilot across tasks.')
  await page.getByRole('button', { name: 'Save notes' }).click()
  await page.reload()

  await expect(page.getByPlaceholder('What did you learn?')).toHaveValue(
    'Repository rules guide Copilot across tasks.'
  )
  await expect(page.getByRole('combobox')).toHaveText('Done')
})

test('deletes a task after confirmation', async ({ page, taskFactory, request }) => {
  const task = await taskFactory()
  await page.goto(`/tasks/${task.id}`)

  page.once('dialog', dialog => dialog.accept())
  await page.getByRole('button', { name: 'Delete' }).click()
  await expect(page).toHaveURL('/practice')
  await expect(page.getByRole('heading', { name: task.title })).toHaveCount(0)
  expect((await request.get(`/api/tasks/${task.id}`)).status()).toBe(404)
})

test('reports API health and rejects invalid task input', async ({ request }) => {
  const health = await request.get('/api/health')
  expect(health.status()).toBe(200)
  expect(await health.json()).toEqual({ status: 'ok' })

  const invalidTask = await request.post('/api/tasks', {
    data: { title: ' ', topic: 'skills' }
  })
  expect(invalidTask.status()).toBe(422)
  expect(await invalidTask.json()).toMatchObject({
    error: 'Unprocessable Entity'
  })
})
