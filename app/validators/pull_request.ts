import vine from '@vinejs/vine'

export const createPullRequestValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3),
    url: vine.string().trim().url(),
    repositoryName: vine.string().trim(),
    description: vine.string().trim().optional(),
    languageId: vine.number(),
  })
)
