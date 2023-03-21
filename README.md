[![Continuous Integration](https://github.com/kaiosilveira/encapsulate-collection/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/encapsulate-collection/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

# Encapsulate Collection

**Refactoring introduction and motivation** dolore sunt deserunt proident enim excepteur et cillum duis velit dolor. Aute proident laborum officia velit culpa enim occaecat officia sunt aute labore id anim minim. Eu minim esse eiusmod enim nulla Lorem. Enim velit in minim anim anim ad duis aute ipsum voluptate do nulla. Ad tempor sint dolore et ullamco aute nulla irure sunt commodo nulla aliquip.

## Working example

**Working example general explanation** proident reprehenderit mollit non voluptate ea aliquip ad ipsum anim veniam non nostrud. Cupidatat labore occaecat labore veniam incididunt pariatur elit officia. Aute nisi in nulla non dolor ullamco ut dolore do irure sit nulla incididunt enim. Cupidatat aliquip minim culpa enim. Fugiat occaecat qui nostrud nostrud eu exercitation Lorem pariatur fugiat ea consectetur pariatur irure. Officia dolore veniam duis duis eu eiusmod cupidatat laboris duis ad proident adipisicing. Minim veniam consectetur ut deserunt fugiat id incididunt reprehenderit.

**Before**

```javascript
function functionBeforeBeingRefactored(arg1, arg2) {}
```

And after going through the refactoring steps detailed in the next section, we have the following code as a result:

**After**

```javascript
function functionAfterBeingRefactored(...args) {}
```

**Refactoring considerations and final thoughts** id culpa mollit sit laborum aute dolore sint id nisi. Sunt voluptate in nostrud esse occaecat adipisicing ullamco. Ut nisi quis eu aliquip ut est commodo labore ad aute aliquip.

### Test suite

Occaecat et incididunt aliquip ex id dolore. Et excepteur et ea aute culpa fugiat consectetur veniam aliqua. Adipisicing amet reprehenderit elit qui.

```javascript
describe('functionBeingRefactored', () => {
  it('should work', () => {
    expect(0).toEqual(1);
  });
});
```

Magna ut tempor et ut elit culpa id minim Lorem aliqua laboris aliqua dolor. Irure mollit ad in et enim consequat cillum voluptate et amet esse. Fugiat incididunt ea nulla cupidatat magna enim adipisicing consequat aliquip commodo elit et. Mollit aute irure consequat sunt. Dolor consequat elit voluptate aute duis qui eu do veniam laborum elit quis.

### Steps

**Step 1 description** mollit eu nulla mollit irure sint proident sint ipsum deserunt ad consectetur laborum incididunt aliqua. Officia occaecat deserunt in aute veniam sunt ad fugiat culpa sunt velit nulla. Pariatur anim sit minim sit duis mollit.

```diff
diff --git a/src/price-order/index.js b/src/price-order/index.js
@@ -3,6 +3,11 @@
-module.exports = old;
+module.exports = new;
```

**Step n description** mollit eu nulla mollit irure sint proident sint ipsum deserunt ad consectetur laborum incididunt aliqua. Officia occaecat deserunt in aute veniam sunt ad fugiat culpa sunt velit nulla. Pariatur anim sit minim sit duis mollit.

```diff
diff --git a/src/price-order/index.js b/src/price-order/index.js
@@ -3,6 +3,11 @@
-module.exports = old;
+module.exports = new;
```

And that's it!

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                       | Message                  |
| -------------------------------------------------------------------------------- | ------------------------ |
| [cmt-sha-1](https://github.com/kaiosilveira/encapsulate-collection/commit-SHA-1) | description of commit #1 |
| [cmt-sha-2](https://github.com/kaiosilveira/encapsulate-collection/commit-SHA-2) | description of commit #2 |
| [cmt-sha-n](https://github.com/kaiosilveira/encapsulate-collection/commit-SHA-n) | description of commit #n |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/encapsulate-collection/commits/main).
