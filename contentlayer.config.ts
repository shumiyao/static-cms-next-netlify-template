import { defineDocumentType, makeSource, defineNestedType } from "contentlayer/source-files";

function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

import _ from "lodash";

const Config = defineDocumentType(() => ({
    name: 'Config',
    isSingleton: true,
    filePathPattern: `config.json`,
    // contentType: 'data',
    fields: {
        base_url: {
            type: 'string',
            required: false,
        },
        site_image: {
            type: 'string',
            required: false,
        },
        site_title: {
            type: 'string',
            required: false,
        },
        site_description: {
            type: 'string',
            required: false,
        },
        site_keywords: {
            type: 'list', of: { type: 'string' },
            required: false,
        },
        twitter_account: {
            type: 'string',
            default: '',
            required: false,
        },
        github_account: {
            type: 'string',
            default: '',
            required: false,
        },
        posts_per_page: {
            type: 'number',
            required: false,
        }
    }
}))

const Author = defineNestedType(() => ({
    name: 'Author',
    fields: {
        slug: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
            required: false,
        },
        introduction: {
            type: 'string',
            required: false,
        }
    },
}))

const Authors = defineDocumentType(() => ({
    name: 'Authors',
    filePathPattern: `meta/authors.yml`,
    isSingleton: true,
    fields: {
        authors: {
            type: 'list', of: Author
        },
    },
}))

const Tag = defineNestedType(() => ({
    name: 'Tag',
    fields: {
        slug: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
            required: false,
        },
    },
}))


const Tags = defineDocumentType(() => ({
    name: 'Tags',
    filePathPattern: `meta/tags.yml`,
    isSingleton: true,
    fields: {
        tags: {
            type: 'list', of: Tag
        },
    }
}))

const Posts = defineDocumentType(() => ({
    name: 'Posts',
    filePathPattern: `posts/*.mdx`,
    contentType: 'mdx',
    fields: {
        slug: {
            type: 'string',
            required: false,
        },
        title: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: false,
        },
        author: {
            type: 'string',
            required: false,
        },
        tags: {
            type: 'list', of: { type: 'string' },
            required: false,
        },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (doc) => doc.slug ? doc.slug : slugify(doc.title),
        },
    }
}))

const I18nPost = defineNestedType(() => ({
    name: 'I18nPost',
    fields: {
        slug: {
            type: 'string',
            required: false,
        },
        title: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: false,
        },
        author: {
            type: 'string',
            required: false,
        },
        tags: {
            type: 'list', of: { type: 'string' },
            required: false,
        },
        body: {
            type: 'mdx',
            required: false,
        },
    },
}))

const I18nPostCollection = defineDocumentType(() => ({
    name: 'I18nPostCollection',
    filePathPattern: `i18n-posts/*.mdx`,
    contentType: 'mdx',
    fields: {
        en: { type: 'nested', of: I18nPost, },
        fr: { type: 'nested', of: I18nPost, },
        ja: { type: 'nested', of: I18nPost, },
    },
    computedFields: {
        fr: {
            type: "nested",
            resolve: (doc) => _.defaults(doc.fr, doc.en),
        },
        ja: {
            type: "nested",
            resolve: (doc) => _.defaults(doc.ja, doc.en),
        },
        slug: {
            type: "string",
            resolve: (doc) => doc.en && doc.en.slug ? doc.en.slug : doc.en ? slugify(doc.en.title) : ''
            ,
        },
    }
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Config, Authors, Tags, Posts, I18nPostCollection],
})