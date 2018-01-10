#!/usr/bin/env ruby
require 'nokogiri'

def assert (condition, msg)
  if (condition == false)
    throw msg
  end
end

def read_current_version
  @doc = File.open("../config.xml") do |f|
    Nokogiri::XML(f)
  end
  version = @doc.xpath("//@version").to_s
  return version
end

def increment_version(old_version)
  version_splitted = old_version.split(".")
  assert(version_splitted.length == 3, 'The version needs to be in NUM.NUM.NUM format')
  version_splitted[0] = version_splitted[0].to_i
  version_splitted[1] = version_splitted[1].to_i
  version_splitted[2] = version_splitted[2].to_i
  version_splitted[2] += 1
  return version_splitted.join('.')
end

def write_new_version (new_version = nil)
  filename = "../config.xml"
  @doc = File.open(filename) do |f|
    Nokogiri::XML(f)
  end
  @doc.root['version'] = new_version
  File.write(filename, @doc.to_xml)
end

old_version = read_current_version
new_version = increment_version old_version
write_new_version new_version
