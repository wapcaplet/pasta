Pasta
=====

This project is an early and experimental attempt at a new kind of text editor.
It is a reboot of an earlier `launchpad project`_. This iteration will be a
web-based, collaborative environment, using client-side rendering for most
graphical elements.

.. _launchpad project: https://launchpad.net/pasta


Installing
----------

Git the source. Install virtualenv_ (good) or virtualenvwrapper_ (better). Then
install the prerequisites::

    $ pip install -r reqs.txt

If it works, you are good to go.

.. _virtualenv: http://www.virtualenv.org/en/latest/
.. _virtualenvwrapper: http://www.doughellmann.com/projects/virtualenvwrapper/


Starting point
--------------

To start dogfooding_ as early as possible, a simple web-based editor with
realtime preview is provided. This was inspired directly by Bret Victor's talk
`Inventing on Principle`_.

Run the editor locally like this::

    $ python server.py

Then load http://localhost:5000/ in your browser.

.. _dogfooding: http://en.wikipedia.org/wiki/Eating_your_own_dog_food
.. _Inventing on Principle: http://www.youtube.com/watch?v=PUv66718DII


Architecture
------------

As of this moment, Pasta is using the Flask_ microframework for its webserver,
and the Jinja_ templating language for HTML files. The embedded code editor is
ACE_, and we may be using `Raphaël`_ for graphic rendering.

Important directories::

- ``templates``: Jinja HTML templates
- ``static``: CSS and Javascript files
- ``mockups``: SVG Design ideas and interface mockups

.. _Flask: http://flask.pocoo.org/
.. _Jinja: http://jinja.pocoo.org/
.. _ACE: http://ace.ajax.org/
.. _Raphaël: http://raphaeljs.com/


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

