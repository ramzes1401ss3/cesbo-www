---
layout: post
lang: en
title: Write Posts to cesbo.com
tags: [dev]
---


<!-- more -->

## Website structure

All post located in the text files with Markdown format.
Path to the file:  `/XX/_posts/` where XX is a language code.
File name shoulbe formatted as `YYYY-MM-DD-TITLE.md` where:

- `YYYY` - year
- `MM` - month, in range 01 .. 12
- `DD` - day of month, in rage 01 .. 31
- `TITLE` - title in lowercase, with hyphen between words

## Post Template

```
---
layout: post
lang: en
title: Post Tile
tags: [tag,tag]
---

Post Description

<!-- more -->

Post Content
```

## Suggest a post

1. Create a repository fork on [github.com](https://github.com/cesbo/cesbo-www/): Press **Fork** button
2. Open direcotry with posts: **en/_posts**
3. Create additional branch for your changes, or select branch if created before:
    1. Press **Branch: master**
    2. Write new repository name. For example: `new post`
    3. Press **Create branch**
4. To create new file:
    1. Press **Create new file**
    2. Set file name in format specified above
    3. Write your post
    4. Press **Commit new file** to append changes into your repository
5. To edit your file:
    1. Open file
    2. Press **Edit this file** (pencil icon)
    3. Make changes
    4. Press **Commit changes**
5. When post will be ready, send it to our repository:
    1. Press **New pull request**
    2. Select in the **compare** field your branch
    3. Press **Create pull request**

## Markdown

Markdown - is a popular markup language to format text that looks great on any device.

<table class="table">
<thead><tr>
	<th scope="col">Format</th>
	<th scope="col">Alternative</th>
	<th scope="col">Result</th>
</tr></thead>
<tbody>
<tr><th colspan="3" class="pt-5">Emphasis</th></tr>
<tr>
	<td class="text-monospace">*Italic*</td>
	<td class="text-monospace">_Italic_</td>
	<td><em>Italic</em></td>
</tr>
<tr>
	<td class="text-monospace">**Bold**</td>
	<td class="text-monospace">__Bold__</td>
	<td><strong>Bold</strong></td>
</tr>
<tr><th colspan="3" class="pt-5">Heading</th></tr>
<tr>
	<td class="text-monospace">## Heading 2</td>
	<td class="text-monospace"></td>
	<td><span class="h2">Heading 2</span></td>
</tr>
<tr>
	<td class="text-monospace">### Heading 3</td>
	<td class="text-monospace"></td>
	<td><span class="h3">Heading 3</span></td>
</tr>
<tr><th colspan="3" class="pt-5">Links</th></tr>
<tr>
	<td class="text-monospace">&lt;https://cesbo.com&gt;</td>
	<td class="text-monospace"></td>
	<td><a href="https://cesbo.com">https://cesbo.com</a></td>
</tr>
<tr>
	<td class="text-monospace">[Link](https://cesbo.com)</td>
	<td class="text-monospace">[Link][1]<br/>&#8942;<br/>[1]: https://cesbo.com</td>
	<td><a href="https://cesbo.com">Link</a></td>
</tr>
<tr><th colspan="3" class="pt-5">Images</th></tr>
<tr>
	<td class="text-monospace">![Image](https://cesbo.com/a.png)</td>
	<td class="text-monospace">![Image][1]<br/>&#8942;<br/>[1]: https://cesbo.com/a.png</td>
	<td><img src="/assets/img/favicon.png" alt="Image" width="36" height="36"/></td>
</tr>
<tr><th colspan="3" class="pt-5">Blockquote</th></tr>
<tr>
	<td class="text-monospace">&gt; quoted text</td>
	<td class="text-monospace"></td>
	<td><blockquote>quoted text</blockquote></td>
</tr>
<tr><th colspan="3" class="pt-5">Lists</th></tr>
<tr>
	<td class="text-monospace">- Item<br/>- Item<br/>&nbsp;&nbsp;&nbsp;&nbsp;- Item</td>
	<td class="text-monospace"></td>
	<td><ul class="pl-3">
		<li>Item</li>
		<li>Item <ul>
			<li>Item</li>
		</ul></li>
	</ul></td>
</tr>
<tr>
	<td class="text-monospace">1. Item 1<br/>2. Item 2<br/>&nbsp;&nbsp;&nbsp;&nbsp;1. Item 2.1</td>
	<td class="text-monospace"></td>
	<td><ol class="pl-3">
		<li>Item</li>
		<li>Item <ol>
			<li>Item</li>
		</ol></li>
	</ol></td>
</tr>
<tr><th colspan="3" class="pt-5">Horizontal Rules</th></tr>
<tr>
	<td class="text-monospace">---</td>
	<td class="text-monospace">***</td>
	<td><hr/></td>
</tr>
<tr><th colspan="3" class="pt-5">Code Blocks</th></tr>
<tr>
	<td class="text-monospace">`Inline code` with backticks</td>
	<td class="text-monospace"></td>
	<td><code class="highlighter-rouge">Inline code</code> with backticks</td>
</tr>
<tr>
	<td class="text-monospace">``` sh<br/># shell code block<br/>echo "3 backticks"<br/>```</td>
	<td class="text-monospace"></td>
	<td><div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c"># shell code block</span>
<span class="nb">echo</span> <span class="s2">"3 backticks"</span>
</code></pre></div></div>
	</td>
</tr>
<tr>
	<td class="text-monospace">```<br/>monospaced text block<br/>wrap with 3 backticks<br/>```</td>
	<td class="text-monospace"></td>
	<td><div class="highlighter-rouge"><div class="highlight"><pre class="highlight"><code>monospaced text block
wrap with 3 backticks
</code></pre></div></div></td>
</tr>
<tr><th colspan="3" class="pt-5">Definition Lists</th></tr>
<tr>
	<td class="text-monospace">Term<br/>: definition<br/>: another definition</td>
	<td class="text-monospace"></td>
	<td><dl><dt>Term</dt><dd>definition</dd><dd>another definition</dd></dl></td>
</tr>
<tr><th colspan="3" class="pt-5">Tables</th></tr>
<tr>
	<td class="text-monospace">
|&nbsp;Head1&nbsp;&nbsp;|&nbsp;Head2&nbsp;&nbsp;|&nbsp;Head3&nbsp;&nbsp;|<br/>
|:-------|:------:|-------:|<br/>
|&nbsp;left&nbsp;&nbsp;&nbsp;|&nbsp;center&nbsp;|&nbsp;right&nbsp;&nbsp;|<br/>
|&nbsp;align&nbsp;&nbsp;|&nbsp;align&nbsp;&nbsp;|&nbsp;align&nbsp;&nbsp;|<br/>
|==========================|<br/>
|&nbsp;Foot1&nbsp;&nbsp;|&nbsp;Foot2&nbsp;&nbsp;|&nbsp;Foot3&nbsp;&nbsp;|<br/>
{: .table}</td>
	<td class="text-monospace"></td>
	<td>
<table class="table"><thead><tr>
<th style="text-align: left">Head1</th>
<th style="text-align: center">Head2</th>
<th style="text-align: right">Head3</th>
</tr></thead><tbody><tr>
<td style="text-align: left">left</td>
<td style="text-align: center">center</td>
<td style="text-align: right">right</td>
</tr><tr>
<td style="text-align: left">align</td>
<td style="text-align: center">align</td>
<td style="text-align: right">align</td>
</tr></tbody><tfoot><tr>
<td style="text-align: left">Foot1</td>
<td style="text-align: center">Foot2</td>
<td style="text-align: right">Foot3</td>
</tr></tfoot></table>
	</td>
</tr>
</tbody></table>
