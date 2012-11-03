Pasta
=====

This project is an early and experimental attempt at a new kind of text editor.
It is a reboot of an earlier `launchpad project`_. This iteration will be a
web-based, collaborative environment, using client-side rendering for most
graphical elements.

.. _launchpad project: https://launchpad.net/pasta


Starting point
--------------

To start dogfooding_ as early as possible, a simple web-based editor with
realtime preview is provided. This was inspired directly by Bret Victor's talk
`Inventing on Principle`_.

For now, you can run the editor locally like this::

    $ cd editor
    $ python -m SimpleHTTPServer

Then load http://localhost:8000/edit.html in your browser. You should see a
two-panel editor, and you should be able to load any files that already exist in
the ``editor`` directory. Files outside this directory won't work until we get a
proper web server running. Try loading ``test.html`` or ``float.html`` for
example.

.. _dogfooding: http://en.wikipedia.org/wiki/Eating_your_own_dog_food
.. _Inventing on Principle: http://www.youtube.com/watch?v=PUv66718DII


Immediate plans
---------------

- Proper load/save of files from disk into the editor
- Render on pause between keystrokes, rather than on each keystroke
- Render async so editing is not interrupted while render is generated
- Allow customizing editor language, keybinding, theme etc.


License
-------

`MIT License`_.

.. _MIT License: http://opensource.org/licenses/MIT

