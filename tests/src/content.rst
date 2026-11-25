Classless Test Page
===================

.. contents:: Contents
   :local:

Text
----

A paragraph with *emphasis*, **strong text**, ``inline code`` and a `link <https://example.org>`_. A footnote follows. [#f1]_

    A block quote.

    -- Somebody

Lists
-----

#. First item
#. Second item

   - Nested item

Term
    Definition of the term.

:Author: A field list
:Version: 1.0

-v, --verbose  An option list.

Admonitions
-----------

.. note:: This is a note.

.. warning:: This is a warning.

Tables
------

.. table:: A table caption

   ======  ========  =====
   Name    Quantity  Price
   ======  ========  =====
   Apple          3   0.50
   Banana        12   0.25
   ======  ========  =====

Code
----

.. code:: python

   def greet(name: str) -> str:
       """Return a greeting. This line is long enough to need horizontal scrolling on phones."""
       return f"Hello, {name}!"

Figures
-------

.. figure:: ../../img/headerimg.jpg
   :alt: Header image

   A figure caption

.. [#f1] The footnote text.
