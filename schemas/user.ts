import { defineField } from "sanity"
import { text } from "stream/consumers"

const user = {
    name: "user",
    title: "user",
    type: "document",
    fields: [
        defineField({
            name: "isAdmin",
            title: "isAdmin",
            type: "boolean",
            description: "check if the user is admin",
            initialValue: false,
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "name",
            title: "Name",
            type: "string",
            description: "Name of user",
            readOnly: true,
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "image",
            title: "image",
            type: "url",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "password",
            type: "string",
            hidden: true,
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "email",
            type: "string",
            title: "Email",
        }),

        defineField({
            name: "emailVerified",
            type: "date",
            hidden: true,
        }),

        defineField({
            name: "about",
            title: "About",
            type: "text",
            description: "brief description of the user",
            validation: (Rule) => Rule.required(),
        }),


    ],

}

export default user