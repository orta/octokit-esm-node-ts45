import {Octokit} from "@octokit/rest"
import express from "express"
import markdownIt from "markdown-it"

const api = new Octokit(process.env.GITHUB_TOKEN)
const pulls = await api.pulls.list({ repo: "TypeScript", owner: "Microsoft" })
let md = `## Open PRs\n\n`
pulls.data.forEach(pr => {
    md += ` - [${pr.title}](${pr.html_url}) - ${pr.number}\n`
});

const html = markdownIt().render(md)

const app = express()
app.get("/", (req, res) => {
    res.send(html)
})

app.listen(8080)