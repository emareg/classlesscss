## Text

A paragraph with *emphasis*, **strong text**, ~~deleted text~~, `inline code`, a [link](https://example.org) and an internal [anchor](#tables). Water is H~2~O and 2^10^ is 1024. A footnote follows.[^1]

A-very-long-unbreakable-word: Donaudampfschifffahrtsgesellschaftskapitaensmuetze.

> A block quote with a second sentence, to check indentation and the left border.
>
> — Somebody

### Lists

1. First item
2. Second item
    - Nested item
    - Another nested item
3. Third item

- [x] Finished task
- [ ] Open task

Term
:   Definition of the term.

## Tables

| Name    | Quantity | Price | Description of the item                  |
|---------|---------:|------:|------------------------------------------|
| Apple   |        3 |  0.50 | A rather long description to force width |
| Banana  |       12 |  0.25 | Yellow                                   |

: A table caption

## Code

```python
def greet(name: str) -> str:
    """Return a greeting. This line is long enough to need horizontal scrolling on phones."""
    return f"Hello, {name}!"  # 42
```

## Figures

![A figure caption](../../img/headerimg.jpg)

---

##### Small heading

Press <kbd>Ctrl</kbd> + <kbd>C</kbd>. This is <mark>marked</mark>, <abbr title="HyperText Markup Language">HTML</abbr>.

<details>
<summary>More details</summary>
<p>Hidden content.</p>
</details>

[^1]: The footnote text.
