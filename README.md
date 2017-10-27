[![Build Status](https://travis-ci.org/AenonDynamics/rsnapshot-ng.svg?branch=ng)](https://travis-ci.org/AenonDynamics/rsnapshot-ng)

RSNAPSHOT-NG
===============================================================================

**rsnapshot-ng comes with ABSOLUTELY NO WARRANTY.**

This is free software, and you are welcome to redistribute it under certain conditions. See the [GNU General Public Licence](LICENSE.md) for details.

Features
----------------------------------------------------------------------------------

**rsnapshot-ng** is a fork of [rsnapshot](https://github.com/rsnapshot/rsnapshot) including some basic improvements and a modern build/test environment.

rsnapshot is a filesystem snapshot utility based on rsync. rsnapshot makes it easy to make periodic snapshots of local machines, and remote machines over ssh.
The code makes **extensive use of hard links** whenever possible, to greatly reduce the disk space required.

It is written entirely in perl with no module dependencies, and has been tested with versions 5.004 through 5.16.3. It should work on any reasonably
modern UNIX compatible OS.

The [HOWTO](HOWTO.md) will give you a detailed walk-through on how to get rsnapshot up and running in explicit detail.

Enhancements
------------------------------------------------------

* `rsync` output is shown on verbosity level >= 3
* 

Documentation and References
--------------------------------------------------------------

Some recommended tutorials/usage guides

* [rsnapshot HOWTO](HOWTO.md)
* [archlinux.de - Tutorial](https://wiki.archlinux.de/title/Rsnapshot)
* [ubuntuusers.de - Tutorial](https://wiki.ubuntuusers.de/rsnapshot/)
* [thomas-krenn.com - Backup unter Linux mit rsnapshot](https://www.thomas-krenn.com/de/wiki/Backup_unter_Linux_mit_rsnapshot)

Config File Syntax
--------------------------------------------------------------

**keyword** `value0` [`value1` [ `value2`]]


Usage
------------------------------------------------------


Once you have installed rsnapshot, you will need to configure it.
The default configuration file is /etc/rsnapshot.conf, although the exact path
may be different depending on how the program was installed. If this
file does not exist, copy `/etc/rsnapshot.conf.default` over to
`/etc/rsnapshot.conf` and edit it to suit your tastes. See the man page for
the full list of configuration options.

When `/etc/rsnapshot.conf` contains your chosen settings, do a quick sanity
check to make sure everything is ready to go:

    $ rsnapshot configtest

If this works, you can see essentially what will happen when you run it for
real by executing the following command (where interval is `alpha`, `beta`, `etc`):

    $ rsnapshot -t [interval]

Once you are happy with everything, the final step is to setup a cron job to
automate your backups. Here is a quick example which makes backups every four
hours, and beta backups for a week:

    0 */4 * * *     /usr/local/bin/rsnapshot alpha
    50 23 * * *     /usr/local/bin/rsnapshot beta

In the previous example, there will be six `alpha` snapshots
taken each day (at 0,4,8,12,16, and 20 hours). There will also
be beta snapshots taken every night at 11:50PM. The number of
snapshots that are saved depends on the "interval" settings in
/etc/rsnapshot.conf.

For example:

    interval	alpha		6

This means that every time `rsnapshot alpha` is run, it will make a
new snapshot, rotate the old ones, and retain the most recent six
(`alpha.0` - `alpha.5`).

If you prefer instead to have three levels of backups (which we'll
call `beta`, `gamma` and `delta`), you might set up cron like this:

    00 00 * * *     /usr/local/bin/rsnapshot beta
    00 23 * * 6     /usr/local/bin/rsnapshot gamma
    00 22 1 * *     /usr/local/bin/rsnapshot delta

This specifies a `beta` rsnapshot at midnight, a `gamma` snapshot
on Saturdays at 11:00pm and a `delta` rsnapshot at 10pm on the
first day of each month.

Note that the backups are done from the highest interval first
(in this case `delta`) and go down to the lowest interval.  If
you are not having cron invoke the `alpha` snapshot interval,
then you must also ensure that `alpha` is not listed as one of
your intervals in rsnapshot.conf (for example, comment out alpha,
so that `beta` becomes the lowest interval).

Remember that it is only the lowest interval which actually does
the rsync to back up the relevant source directories, the higher
intervals just rotate snapshots around.  Unless you have enabled
`sync_first` in your configuration-file, in which case only the `sync`
pseudo-interval does the actual rsync, and all real intervals
just rotate snapshots.

For the full documentation, type `man rsnapshot` once it is installed,
or visit http://www.rsnapshot.org/.  The HowTo on the web site has a
detailed overview of how to install and configure rsnapshot, and things
like how to set it up so users can restore their own files.


COMPATIBILITY NOTICES
--------------------------------------------------------------

 1. Note that systems which use GNU cp version 5.9 or later will have problems
    with rsnapshot versions up to and including 1.2.3, if `cmd_cp` is enabled
    (and points at the later gnu cp).  This is no longer a problem since
    rsnapshot 1.2.9, as it strips off trailing slashes when running cp.

 2. If you have rsync version 2.5.7 or later, you may want to enable the
    link_dest parameter in the rsnapshot.conf file.

    If you are running Linux but do not have the problem above, you should
    enable the `cmd_cp` parameter in rsnapshot.conf (especially if you do not
    have link_dest enabled).

    Be advised that currently `link_dest` doesn't do well with unavailable hosts.
    Specifically, if a remote host is unavailable using `link_dest`, there will
    be no latest backup of that machine, and a full re-sync will be required
    when it becomes available. Using the other methods, the last good snapshot
    will be preserved, preventing the need for a re-sync. We hope to streamline
    this in the future.

Authors
--------------------------------------------------------

Please see the [AUTHORS](AUTHORS,md) file for the complete list of contributors.


License
-------

**rsnapshot-ng** is OpenSource and licensed under the Terms of [GNU General Public Licence v2](LICENSE.md). You're welcome to contribute!

Many Thanks to the authors of the original [rsnapshot](https://github.com/rsnapshot/rsnapshot)